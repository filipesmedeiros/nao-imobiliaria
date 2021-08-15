import { NextApiHandler } from 'next'

import { downvotePhoneNumber } from '@lib/api/downvotePhoneNumber'

const downvotePhoneNumberHandler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end()
  } else {
    const { phoneNumber } = req.query

    const phoneNumberUpdateResult = await downvotePhoneNumber(
      phoneNumber as string
    )
    res.json(phoneNumberUpdateResult)
  }
}

export default downvotePhoneNumberHandler
