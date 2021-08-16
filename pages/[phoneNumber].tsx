import { GetServerSideProps, NextPage } from 'next'
import useSWR from 'swr'
import { useState } from 'react'

import { getPhoneNumber } from '@lib/mongoActions/getPhoneNumber'
import { validatePhoneNumber } from '@lib/validatePhoneNumber'
import { useUserId } from '@lib/context/userIdContext'
import { fetcher } from '@lib/swrFetcher'
import { UnkownPhoneNumber } from '@components/UnkownPhoneNumber'
import { RegisteredPhoneNumber } from '@components/RegisteredPhoneNumber'

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
    isValidating: loadingUserVote,
    revalidate,
    mutate,
  } = useSWR<{ vote: boolean }>(
    isRegistered ? `/api/users/${userId}/votes/${phoneNumber}` : null,
    fetcher
  )

  const memorizePreviousVotes = () => {
    const originalUpvotes = upvotes
    const originalDownvotes = downvotes
    const originalUserVote = vote

    return () => {
      setUpvotes(originalUpvotes)
      setDownvotes(originalDownvotes)
      if (originalUserVote !== undefined) mutate({ vote: originalUserVote })
    }
  }

  const onRegisterPhoneNumber = () =>
    registerPhoneNumber(phoneNumber, userId).then(() => {
      setIsRegistered(true)
      incUpvotes()
      revalidate()
    })

  const onUpvote = () => {
    const revert = memorizePreviousVotes()
    incUpvotes()
    if (vote === false) decDownvotes()
    mutate({ vote: true }, false)

    voteOnPhoneNumber(phoneNumber, true, userId).catch(revert)
  }

  const onDownvote = () => {
    const revert = memorizePreviousVotes()
    incDownvotes()
    if (vote) decUpvotes()
    mutate({ vote: false }, false)

    voteOnPhoneNumber(phoneNumber, false, userId).catch(revert)
  }

  return (
    <div>
      <h1>{phoneNumber}</h1>
      {!isRegistered ? (
        <UnkownPhoneNumber onRegisterPhoneNumber={onRegisterPhoneNumber} />
      ) : (
        <RegisteredPhoneNumber
          upvotes={upvotes}
          downvotes={downvotes}
          userVote={{ vote, loading: loadingUserVote }}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
        />
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
