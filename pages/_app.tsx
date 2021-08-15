import { v4 } from 'uuid'
import { AppProps } from 'next/app'
import { FingerprintProvider } from '@lib/context/fingerprintContext'

const createFingerprint = () => {
  const fingerprint = v4()
  localStorage.setItem('userFingerprint', fingerprint)
  return fingerprint
}

const App = ({ Component, pageProps }: AppProps) => {
  const fingerprint =
    localStorage.getItem('userFingerprint') ?? createFingerprint()

  return (
    <FingerprintProvider fingerprint={fingerprint}>
      <Component {...pageProps} />
    </FingerprintProvider>
  )
}

export default App
