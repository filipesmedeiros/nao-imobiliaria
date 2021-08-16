import { getUsersColl } from '@lib/mongo'

export const addVoteToUser = async (
  userId: string,
  phoneNumber: string,
  vote: boolean
) => {
  const { usersColl, close } = await getUsersColl()
  return usersColl
    .updateOne({ userId }, { $set: { [`votes.${phoneNumber}`]: vote } })
    .finally(close)
}
