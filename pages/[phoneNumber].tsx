import { GetServerSideProps, NextPage } from 'next'

import { getPhoneNumber } from '@lib/api/getPhoneNumber'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { validatePhoneNumber } from '@lib/validatePhoneNumber'
import { useFingerprint } from '@lib/context/fingerprintContext'

export interface Props {
  phoneNumber: string
  isRegistered: boolean
  upvotes?: number
  downvotes?: number
}

const PhoneNumberPage: NextPage<Props> = ({
  phoneNumber,
  isRegistered: wasRegistered,
  upvotes: startingUpvotes,
  downvotes: startingDownvotes,
}: Props) => {
  const [isRegistered, setIsRegistered] = useState(wasRegistered)
  const [upvotes, setUpvotes] = useState(startingUpvotes ?? 0)
  const [downvotes, setDownvotes] = useState(startingDownvotes ?? 0)

  const registerNumber = () =>
    fetch(`/api/phoneNumbers/${phoneNumber}`, { method: 'POST' }).then(() => {
      setIsRegistered(true)
      setUpvotes(1)
    })

  const vote = (vote: boolean) =>
    fetch(`/api/phoneNumbers/${phoneNumber}/${vote ? 'up' : 'down'}vote`, {
      method: 'POST',
    }).then(res => {
      if (res.status < 200 || res.status >= 300) throw new Error()
    })

  const upvote = () => {
    const tempUpvotes = upvotes
    setUpvotes(prevUpvotes => prevUpvotes + 1)
    vote(true).catch(() => setUpvotes(tempUpvotes))
  }
  const downvote = () => {
    const tempDownvotes = downvotes
    setDownvotes(prevDownvotes => prevDownvotes + 1)
    vote(false).catch(() => setDownvotes(tempDownvotes))
  }

  const isAgent = upvotes > downvotes

  const fingerprint = useFingerprint()
  const getUserVote = () =>
    fetch(`/api/users/${fingerprint}/votes/${phoneNumber}`).then(res =>
      res.json()
    )

  return (
    <div>
      <h1>{phoneNumber}</h1>
      {!isRegistered ? (
        <div>
          <h2>Este número ainda não está registado, queres registá-lo?</h2>
          <button onClick={registerNumber}>Registar</button>
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
            <button onClick={upvote}>Upvote</button>
          </div>
          <div>
            <div>{downvotes}</div>
            <button onClick={downvote}>Downvote</button>
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
