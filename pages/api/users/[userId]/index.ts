import { NextApiHandler } from 'next'

import { getUser } from '@lib/mongoActions/getUser'

const getUserHandler: NextApiHandler = async ({ query: { userId } }, res) => {
  const user = await getUser(userId as string)
  res.json(user)
}

export default getUserHandler
