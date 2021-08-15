import { MongoClient } from 'mongodb'

import { PhoneNumber, User } from '@lib/types'

const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.lez4s.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`

export const connect = () => new MongoClient(URI).connect()

export const COLLECTIONS = {
  USERS: 'users',
  PHONE_NUMBERS: 'phoneNumbers',
}

export const getPhoneNumbersColl = async () => {
  const client = await connect()

  return {
    phoneNumbersColl: client
      .db(process.env.MONGO_DATABASE)
      .collection<PhoneNumber>(COLLECTIONS.PHONE_NUMBERS),
    close: () => client.close(),
  }
}

export const getUsersColl = async () => {
  const client = await connect()

  return {
    usersColl: client
      .db(process.env.MONGO_DATABASE)
      .collection<User>(COLLECTIONS.USERS),
    close: () => client.close(),
  }
}
