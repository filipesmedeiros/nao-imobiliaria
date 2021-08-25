import { NextApiHandler } from 'next'

import { createUser } from '@lib/mongoActions/createUser'
import { getAllUsers } from '@lib/mongoActions/getAllUsers'
import { getUser } from '@lib/mongoActions/getUser'

const getAllUsersHandler: NextApiHandler = async (_, res) => {
  const users = await getAllUsers()
  res.json(users)
}

const createUserHandler: NextApiHandler = async ({ body: { userId } }, res) => {
  const user = await getUser(userId)
  let status = 200
  if (user === undefined) {
    await createUser(userId)
    status = 201
  } else res.status(status).end()
}

const apiHandler: NextApiHandler = (req, res) =>
  req.method === 'POST'
    ? createUserHandler(req, res)
    : getAllUsersHandler(req, res)

export default apiHandler
