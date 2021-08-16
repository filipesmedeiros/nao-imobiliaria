import { NextApiHandler } from 'next'

import { getUser } from '@lib/mongoActions/getUser'

const getUserHandler: NextApiHandler = ({ query: { userId } }, res) =>
  getUser(userId as string).then(res.json)

export default getUserHandler
