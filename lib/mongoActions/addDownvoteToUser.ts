import { addVoteToUser } from './addVoteToUser'

export const addDownvoteToUser = (userId: string, phoneNumber: string) =>
  addVoteToUser(userId, phoneNumber, false)
