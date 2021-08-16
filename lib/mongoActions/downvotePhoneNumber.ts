import { votePhoneNumber } from './votePhoneNumber'

export const downvotePhoneNumber = (phoneNumber: string, swapVote = false) =>
  votePhoneNumber(phoneNumber, false, swapVote)
