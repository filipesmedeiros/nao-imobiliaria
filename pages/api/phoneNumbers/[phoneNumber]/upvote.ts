import { NextApiHandler } from 'next'

import { upvotePhoneNumber } from '@lib/mongoActions/upvotePhoneNumber'
import { getUserVoteOnPhoneNumber } from '@lib/mongoActions/getUserVotesOnPhoneNumber'
import { userExists } from '@lib/mongoActions/userExists'
import { addUpvoteToUser } from '@lib/mongoActions/addUpvoteToUser'

const upvotePhoneNumberHandler: NextApiHandler = async (
  { query: { phoneNumber }, body: { userId } },
  res
) => {
  const userExistsPromise = userExists(userId)
  const userVotePromise = getUserVoteOnPhoneNumber(
    userId,
    phoneNumber as string
  )

  const [_userExists, userVote] = await Promise.all([
    userExistsPromise,
    userVotePromise,
  ])

  if (!_userExists) {
    res.status(400).end()
    return
  }

  const hasVote = userVote !== undefined
  await Promise.all([
    addUpvoteToUser(userId, phoneNumber as string),
    upvotePhoneNumber(phoneNumber as string, hasVote),
  ])
  res.status(200).end()
}

const apiHandler: NextApiHandler = (req, res) =>
  req.method === 'POST'
    ? upvotePhoneNumberHandler(req, res)
    : res.status(204).end()

export default apiHandler
