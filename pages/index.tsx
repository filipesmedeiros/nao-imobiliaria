import Head from 'next/head'
import styled from '@emotion/styled'
import { CheckPhoneNumberForm } from '@components/CheckPhoneNumberForm'

const Subtitle = styled.h2`
  text-align: center;

  margin: 0;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 5rem;
`

const Home = () => {
  return (
    <>
      <Head>
        <title>Não, imobiliária!</title>
        <meta
          name="description"
          content="Verifica se o número que te está a ligar pertence a um/a agente imobiliári@"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentWrapper>
        <Subtitle>
          Verifica se o número que te está a ligar pertence a um/a agente
          imobiliári@
        </Subtitle>

        <CheckPhoneNumberForm />
      </ContentWrapper>
    </>
  )
}

export default Home
