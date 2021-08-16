import { getUsersColl } from '@lib/mongo'

export const createUser = async (userId: string) => {
  const { usersColl, close } = await getUsersColl()
  return usersColl.insertOne({ userId, votes: {} }).finally(close)
}
