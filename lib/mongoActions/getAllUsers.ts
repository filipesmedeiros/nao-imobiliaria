import { getUsersColl } from '@lib/mongo'

export const getAllUsers = async () => {
  const { usersColl, close } = await getUsersColl()
  return usersColl.find().toArray().finally(close)
}
