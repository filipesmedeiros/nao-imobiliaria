import { getUsersColl } from '@lib/mongo'

export const getUserVoteOnPhoneNumber = async (
  userId: string,
  phoneNumber: string
) => {
  const { usersColl, close } = await getUsersColl()
  const user = await usersColl
    .findOne({ userId }, { projection: { votes: 1 } })
    .finally(close)

  return user?.votes[phoneNumber]
}
