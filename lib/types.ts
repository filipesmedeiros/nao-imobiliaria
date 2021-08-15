export interface PhoneNumber {
  phoneNumber: string
  upvotes: number
  downvotes: number
}

export interface User {
  id: string
  fingerprint: string
  votes: Vote[]
}

export interface Vote {
  phoneNumber: string
  vote: boolean
}
