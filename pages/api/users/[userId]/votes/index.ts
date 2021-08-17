import { NextApiHandler } from 'next'

import { getUserVotes } from '@lib/mongoActions/getUserVotes'

const getUserVotesHandler: NextApiHandler = async (
  { query: { userId } },
  res
) => {
  const userVotes = await getUserVotes(userId as string)
  res.json(userVotes)
}

const apiHandler: NextApiHandler = (req, res) =>
  req.method === 'GET' ? getUserVotesHandler(req, res) : res.status(204).end()

export default apiHandler
