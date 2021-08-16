import { getUsersColl } from '@lib/mongo'

export const getUserVotes = async (userId: string) => {
  const { usersColl, close } = await getUsersColl()
  return usersColl
    .findOne({ userId }, { projection: { votes: 1 } })
    .then(user => user?.votes)
    .finally(close)
}
