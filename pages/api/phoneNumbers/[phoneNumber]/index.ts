import { NextApiHandler } from 'next'

import { getPhoneNumber } from '@lib/mongoActions/getPhoneNumber'

const getPhoneNumberHandler: NextApiHandler = (
  { query: { phoneNumber } },
  res
) =>
  getPhoneNumber(phoneNumber as string).then(phoneNumberObj =>
    res.status(phoneNumberObj !== undefined ? 200 : 404).json(phoneNumberObj)
  )

const apiHandler: NextApiHandler = (req, res) =>
  req.method === 'GET' ? getPhoneNumberHandler(req, res) : res.status(204).end()

export default apiHandler
