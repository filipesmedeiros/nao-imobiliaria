import { getPhoneNumbersColl } from '@lib/mongo'

export const getAllPhoneNumbers = async () => {
  const { phoneNumbersColl, close } = await getPhoneNumbersColl()
  return phoneNumbersColl.find().toArray().finally(close)
}
