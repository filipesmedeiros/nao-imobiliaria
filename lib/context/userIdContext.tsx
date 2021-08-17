import { createContext, ReactNode, useContext } from 'react'

const userIdContext = createContext<string | undefined>(undefined)

export interface UserIdProviderProps {
  userId: string
  children: ReactNode
}

export const UserIdProvider = ({ userId, children }: UserIdProviderProps) => (
  <userIdContext.Provider value={userId}>{children}</userIdContext.Provider>
)

export const useUserId = () => {
  const userId = useContext(userIdContext)

  if (userId === undefined)
    throw new Error('`useUserId` must be used inside a `FingerprintProvider`')

  return userId
}
