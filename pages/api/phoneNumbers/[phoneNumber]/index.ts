import { NextApiHandler } from 'next'

import { createPhoneNumber } from '@lib/api/createPhoneNumber'
import { getPhoneNumber } from '@lib/api/getPhoneNumber'

const registerPhoneNumberHandler: NextApiHandler = async (req, res) => {
  const { phoneNumber } = req.query

  const phoneNumberObj = await createPhoneNumber(phoneNumber as string, {
    upvotes: 1,
  })

  res.status(204).json(phoneNumberObj)
}

const getPhoneNumberHandler: NextApiHandler = async (req, res) => {
  const { phoneNumber } = req.query
  const phoneNumberObj = await getPhoneNumber(phoneNumber as string)
  res.status(phoneNumberObj !== undefined ? 200 : 404).json(phoneNumberObj)
}

const apiHandler: NextApiHandler = (req, res) =>
  (req.method ?? 'GET') === 'GET'
    ? getPhoneNumberHandler(req, res)
    : registerPhoneNumberHandler(req, res)

export default apiHandler
