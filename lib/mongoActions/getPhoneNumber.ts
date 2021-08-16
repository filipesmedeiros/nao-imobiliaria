import { getPhoneNumbersColl } from '@lib/mongo'

export const getPhoneNumber = async (phoneNumber: string) => {
  const { phoneNumbersColl, close } = await getPhoneNumbersColl()
  return phoneNumbersColl.findOne({ phoneNumber }).finally(close)
}
