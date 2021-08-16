export interface PhoneNumber {
  phoneNumber: string
  upvotes: number
  downvotes: number
}

export interface User {
  userId: string
  votes: Record<string, boolean>
}
