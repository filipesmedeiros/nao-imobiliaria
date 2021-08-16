import { getPhoneNumbersColl } from '@lib/mongo'

export const votePhoneNumber = async (
  phoneNumber: string,
  vote: boolean,
  swapVote = false
) => {
  const { phoneNumbersColl, close } = await getPhoneNumbersColl()
  return await phoneNumbersColl
    .updateOne(
      { phoneNumber },
      {
        $inc: vote
          ? { upvotes: 1, ...(swapVote ? { downvotes: -1 } : {}) }
          : { downvotes: 1, ...(swapVote ? { upvotes: -1 } : {}) },
      }
    )
    .finally(close)
}
