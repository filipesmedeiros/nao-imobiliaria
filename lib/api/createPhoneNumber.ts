import { getPhoneNumbersColl } from '@lib/mongo'

export const createPhoneNumber = async (
  phoneNumber: string,
  {
    upvotes = 0,
    downvotes = 0,
  }: {
    upvotes?: number
    downvotes?: number
  } = {}
) => {
  const { phoneNumbersColl, close } = await getPhoneNumbersColl()
  return phoneNumbersColl
    .insertOne({ phoneNumber, downvotes, upvotes })
    .finally(close)
}
