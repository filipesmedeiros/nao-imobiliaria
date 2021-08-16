import { votePhoneNumber } from './votePhoneNumber'

export const upvotePhoneNumber = (phoneNumber: string, swapVote = false) =>
  votePhoneNumber(phoneNumber, true, swapVote)
