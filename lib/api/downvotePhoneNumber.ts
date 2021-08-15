import { votePhoneNumber } from './votePhoneNumber'

export const downvotePhoneNumber = (phoneNumber: string) =>
  votePhoneNumber(phoneNumber, false)
