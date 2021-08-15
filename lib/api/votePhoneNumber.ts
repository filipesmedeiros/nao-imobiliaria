import { getPhoneNumbersColl } from '@lib/mongo'

export const votePhoneNumber = async (phoneNumber: string, vote: boolean) => {
  const { phoneNumbersColl, close } = await getPhoneNumbersColl()
  return await phoneNumbersColl
    .updateOne(
      { phoneNumber },
      { $inc: vote ? { upvotes: 1 } : { downvotes: 1 } }
    )
    .finally(close)
}
