import { createContext, ReactNode, useContext } from 'react'

const fingerprintContext = createContext<string | undefined>(undefined)

export interface FingerprintProviderProps {
  fingerprint: string
  children: ReactNode
}

export const FingerprintProvider = ({
  fingerprint,
  children,
}: FingerprintProviderProps) => (
  <fingerprintContext.Provider value={fingerprint}>
    {children}
  </fingerprintContext.Provider>
)

export const useFingerprint = () => {
  const fingerprint = useContext(fingerprintContext)

  if (fingerprint === undefined)
    throw new Error(
      '`useFingerprint` must be used inside a `FingerprintProvider`'
    )

  return fingerprint
}
