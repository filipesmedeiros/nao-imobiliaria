import { ReactNode } from 'react'
import styled from '@emotion/styled'

import { Footer } from '@components/Footer'
import { Header } from '@components/Header'

export interface Props {
  children: ReactNode
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ContentWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 5rem;
`
export const Layout = ({ children }: Props) => (
  <Container>
    <ContentWrapper>
      <Header />
      <main>{children}</main>
    </ContentWrapper>
    <Footer />
  </Container>
)
