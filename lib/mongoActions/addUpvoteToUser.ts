import { addVoteToUser } from './addVoteToUser'

export const addUpvoteToUser = (userId: string, phoneNumber: string) =>
  addVoteToUser(userId, phoneNumber, true)
