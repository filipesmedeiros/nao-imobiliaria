import { NextApiHandler } from 'next'

import { getUserVotes } from '@lib/mongoActions/getUserVotes'

const getUserVotesHandler: NextApiHandler = ({ query: { userId } }, res) =>
  getUserVotes(userId as string).then(res.json)

const apiHandler: NextApiHandler = (req, res) =>
  req.method === 'GET' ? getUserVotesHandler(req, res) : res.status(204).end()

export default apiHandler
