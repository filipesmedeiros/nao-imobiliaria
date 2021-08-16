import { getPhoneNumbersColl } from '@lib/mongo'

export const phoneNumberExists = async (phoneNumber: string) => {
  const { phoneNumbersColl, close } = await getPhoneNumbersColl()
  return phoneNumbersColl
    .findOne({ phoneNumber })
    .then(phoneNumberObj => phoneNumberObj !== undefined)
    .finally(close)
}
