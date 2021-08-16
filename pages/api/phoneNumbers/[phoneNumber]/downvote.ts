import { NextApiHandler } from 'next'

import { downvotePhoneNumber } from '@lib/mongoActions/downvotePhoneNumber'
import { userExists } from '@lib/mongoActions/userExists'
import { getUserVoteOnPhoneNumber } from '@lib/mongoActions/getUserVotesOnPhoneNumber'
import { addDownvoteToUser } from '@lib/mongoActions/addDownvoteToUser'

const downvotePhoneNumberHandler: NextApiHandler = async (
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
  addDownvoteToUser(userId, phoneNumber as string)
  downvotePhoneNumber(phoneNumber as string, hasVote).then(res.json)
}

const apiHandler: NextApiHandler = (req, res) =>
  req.method === 'POST'
    ? downvotePhoneNumberHandler(req, res)
    : res.status(204).end()

export default apiHandler
