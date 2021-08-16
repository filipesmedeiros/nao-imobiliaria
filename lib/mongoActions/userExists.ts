import { getUsersColl } from '@lib/mongo'

export const userExists = async (userId: string) => {
  const { usersColl, close } = await getUsersColl()
  return usersColl
    .findOne({ userId })
    .then(user => user !== undefined)
    .finally(close)
}
