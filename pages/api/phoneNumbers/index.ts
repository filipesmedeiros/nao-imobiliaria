import { NextApiHandler } from 'next'

import { getAllPhoneNumbers } from '@lib/api/getAllPhoneNumbers'

const getAllPosts: NextApiHandler = async (_, res) => {
  const phoneNumbers = await getAllPhoneNumbers()
  res.json(phoneNumbers)
}

export default getAllPosts
