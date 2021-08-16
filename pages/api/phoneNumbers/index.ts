import { NextApiHandler } from 'next'

import { getAllPhoneNumbers } from '@lib/mongoActions/getAllPhoneNumbers'
import { createPhoneNumber } from '@lib/mongoActions/createPhoneNumber'
import { getPhoneNumber } from '@lib/mongoActions/getPhoneNumber'
import { addUpvoteToUser } from '@lib/mongoActions/addUpvoteToUser'

const getAllPhoneNumbersHandler: NextApiHandler = (_, res) =>
  getAllPhoneNumbers().then(res.json)

const registerPhoneNumberHandler: NextApiHandler = async (
  { body: { phoneNumber, userId } },
  res
) => {
  const phoneNumberObj = await getPhoneNumber(phoneNumber)
  let status = 200
  if (phoneNumberObj === undefined) {
    const createPhoneNumberPromise = createPhoneNumber(phoneNumber as string, {
      upvotes: 1,
    })

    const addUpvoteToUserPromise = addUpvoteToUser(userId, phoneNumber)

    await Promise.all([createPhoneNumberPromise, addUpvoteToUserPromise])

    status = 201
  }
  res.status(status).end()
}

const apiHandler: NextApiHandler = (req, res) =>
  req.method === 'POST'
    ? registerPhoneNumberHandler(req, res)
    : getAllPhoneNumbersHandler(req, res)

export default apiHandler
