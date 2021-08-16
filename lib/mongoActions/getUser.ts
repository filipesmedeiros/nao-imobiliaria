import { getUsersColl } from '@lib/mongo'

export const getUser = async (userId: string) => {
  const { usersColl, close } = await getUsersColl()
  return usersColl.findOne({ userId }).finally(close)
}
