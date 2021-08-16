import { GetServerSideProps, NextPage } from 'next'
import useSWR from 'swr'
import { useState } from 'react'

import { getPhoneNumber } from '@lib/mongoActions/getPhoneNumber'
import { validatePhoneNumber } from '@lib/validatePhoneNumber'
import { useUserId } from '@lib/context/userIdContext'
import { fetcher } from '@lib/swrFetcher'

export interface Props {
  phoneNumber: string
  isRegistered: boolean
  upvotes?: number
  downvotes?: number
}

const registerPhoneNumber = (phoneNumber: string, userId: string) =>
  fetch('/api/phoneNumbers', {
    method: 'POST',
    headers: [['Content-Type', 'application/json']],
    body: JSON.stringify({ phoneNumber, userId }),
  }).then(res => {
    if (res.status < 200 || res.status >= 300) throw new Error()
  })

const voteOnPhoneNumber = (
  phoneNumber: string,
  vote: boolean,
  userId: string
) =>
  fetch(`/api/phoneNumbers/${phoneNumber}/${vote ? 'up' : 'down'}vote`, {
    method: 'POST',
    headers: [['Content-Type', 'application/json']],
    body: JSON.stringify({ userId }),
  }).then(res => {
    if (res.status < 200 || res.status >= 300) throw new Error()
  })

const PhoneNumberPage: NextPage<Props> = ({
  phoneNumber,
  isRegistered: wasRegistered,
  upvotes: startingUpvotes,
  downvotes: startingDownvotes,
}: Props) => {
  const [isRegistered, setIsRegistered] = useState(wasRegistered)
  const [upvotes, setUpvotes] = useState(startingUpvotes ?? 0)
  const [downvotes, setDownvotes] = useState(startingDownvotes ?? 0)

  const incUpvotes = () => setUpvotes(prevUpvotes => prevUpvotes + 1)
  const decUpvotes = () => setUpvotes(prevUpvotes => prevUpvotes - 1)
  const incDownvotes = () => setDownvotes(prevDownvotes => prevDownvotes + 1)
  const decDownvotes = () => setDownvotes(prevDownvotes => prevDownvotes - 1)

  const userId = useUserId()
  const {
    data: { vote } = {},
    isValidating,
    revalidate,
    mutate,
  } = useSWR<{ vote: boolean }>(
    `/api/users/${userId}/votes/${phoneNumber}`,
    fetcher
  )

  const onRegisterPhoneNumber = () =>
    registerPhoneNumber(phoneNumber, userId).then(() => {
      setIsRegistered(true)
      incUpvotes()
      revalidate()
    })

  const upvote = () => {
    const originalUpvotes = upvotes
    const originalDownvotes = downvotes
    incUpvotes()
    if (vote === false) decDownvotes()
    mutate({ vote: true }, false)

    const revert = () => {
      setUpvotes(originalUpvotes)
      setDownvotes(originalDownvotes)
      mutate({ vote: false })
    }

    voteOnPhoneNumber(phoneNumber, true, userId).catch(revert)
  }
  const downvote = () => {
    const originalUpvotes = upvotes
    const originalDownvotes = downvotes
    incDownvotes()
    if (vote) decUpvotes()
    mutate({ vote: false }, false)

    const revert = (e: any) => {
      setUpvotes(originalUpvotes)
      setDownvotes(originalDownvotes)
      mutate({ vote: true })
    }

    voteOnPhoneNumber(phoneNumber, false, userId).catch(revert)
  }

  const isAgent = upvotes > downvotes

  console.log(vote)

  return (
    <div>
      <h1>{phoneNumber}</h1>
      {!isRegistered ? (
        <div>
          <h2>Este número ainda não está registado, queres registá-lo?</h2>
          <button onClick={onRegisterPhoneNumber}>Registar</button>
        </div>
      ) : (
        <div>
          {isAgent ? (
            <div>
              <h2>SIM</h2>
              <h3>Este número pertence a um/a agente imobiliári@</h3>
            </div>
          ) : (
            <div>
              <h2>NÃO</h2>
              <h3>Este número não pertence a um/a agente imobiliári@</h3>
            </div>
          )}
          <div>
            <div>{upvotes}</div>
            <button onClick={upvote} disabled={isValidating || vote}>
              Upvote
            </button>
          </div>
          <div>
            <div>{downvotes}</div>
            <button
              onClick={downvote}
              disabled={isValidating || vote === false}
            >
              Downvote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query: { phoneNumber },
}) => {
  if (phoneNumber === undefined || !validatePhoneNumber(phoneNumber as string))
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }

  const phoneNumberObj = await getPhoneNumber(phoneNumber as string)
  const isRegistered = phoneNumberObj !== undefined
  const votes =
    phoneNumberObj !== undefined
      ? {
          upvotes: phoneNumberObj.upvotes,
          downvotes: phoneNumberObj.downvotes,
        }
      : undefined

  return {
    props: {
      phoneNumber: phoneNumber as string,
      isRegistered,
      ...votes,
    },
  }
}

export default PhoneNumberPage
