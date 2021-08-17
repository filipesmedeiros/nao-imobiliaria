import styled from '@emotion/styled'

import { Link } from '@components/Link'

const StyledLink = styled(Link)`
  color: unset;
  text-decoration: none;
`

const HeaderWrapper = styled.header`
  flex-basis: 20%;

  display: flex;
  align-items: end;
`

const Title = styled.h1`
  font-size: 3em;

  margin: 0;
`

export const Header = () => (
  <HeaderWrapper>
    <StyledLink href="/">
      <Title>Não, imboliária!</Title>
    </StyledLink>
  </HeaderWrapper>
)
