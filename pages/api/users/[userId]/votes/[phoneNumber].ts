import { NextApiHandler } from 'next'

import { getUserVoteOnPhoneNumber } from '@lib/mongoActions/getUserVotesOnPhoneNumber'

const getUserVoteOnPhoneNumberHandler: NextApiHandler = async (
  { query: { userId, phoneNumber } },
  res
) => {
  const vote = await getUserVoteOnPhoneNumber(
    userId as string,
    phoneNumber as string
  )
  if (vote !== undefined) res.json({ vote: vote ?? null })
  else res.status(404).end()
}

const apiHandler: NextApiHandler = (req, res) =>
  req.method === 'GET'
    ? getUserVoteOnPhoneNumberHandler(req, res)
    : res.status(204).end()

export default apiHandler
