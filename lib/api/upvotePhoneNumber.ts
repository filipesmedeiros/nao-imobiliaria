import { votePhoneNumber } from './votePhoneNumber'

export const upvotePhoneNumber = (phoneNumber: string) =>
  votePhoneNumber(phoneNumber, true)
