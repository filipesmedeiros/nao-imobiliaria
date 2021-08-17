import { v4 } from 'uuid'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { FingerprintProvider } from '@lib/context/userIdContext'
import { Layout } from '@components/Layout'

import '@styles/globals.css'

const USERID_LOCAL_STORAGE_KEY = 'userId'

const generateUserId = () => {
  const userId = v4()
  localStorage.setItem(USERID_LOCAL_STORAGE_KEY, userId)
  return userId
}

const createUser = (userId: string) =>
  fetch('/api/users', {
    method: 'POST',
    headers: [['Content-Type', 'application/json']],
    body: JSON.stringify({ userId }),
  }).then(res => {
    if (res.status < 200 || res.status >= 300) throw new Error()
  })

const getUserIdFromLocalStorage = () =>
  localStorage.getItem(USERID_LOCAL_STORAGE_KEY)

const App = ({ Component, pageProps }: AppProps) => {
  const [userId, setUserId] = useState<string>()

  useEffect(() => {
    const userId = getUserIdFromLocalStorage() ?? generateUserId()
    setUserId(userId)
    createUser(userId).catch(() =>
      alert('Erro ao iniciar, não vais conseguir a app :(')
    )
  }, [])

  if (userId === null || userId === undefined) return <div>Loading...</div>

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <FingerprintProvider userId={userId}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FingerprintProvider>
    </>
  )
}

export default App
