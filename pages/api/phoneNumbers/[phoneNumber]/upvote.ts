import { upvotePhoneNumber } from '@lib/api/upvotePhoneNumber'
import { NextApiHandler } from 'next'

const upvotePhoneNumberHandler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end()
  } else {
    const { phoneNumber } = req.query

    const phoneNumberUpdateResult = await upvotePhoneNumber(
      phoneNumber as string
    )
    res.json(phoneNumberUpdateResult)
  }
}

export default upvotePhoneNumberHandler
