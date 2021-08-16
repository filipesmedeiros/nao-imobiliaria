import { getUsersColl } from '@lib/mongo'

export const removeVoteFromUser = async (
  userId: string,
  phoneNumber: string
) => {
  const { usersColl, close } = await getUsersColl()
  return usersColl
    .updateOne({ userId }, { $unset: { [`votes.${phoneNumber}`]: '' } })
    .finally(close)
}
