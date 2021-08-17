import styled from '@emotion/styled'

import { gradientKeyframes } from '@styles/keyframes'
import { gradientWithLoop } from '@styles/theme'

export interface Props {
  phoneNumber: string
}

const PhoneNumber = styled.h1`
  font-weight: 900;
  font-size: 5rem;
  text-align: center;
  letter-spacing: 0.5rem;

  background: linear-gradient(to right, ${gradientWithLoop});
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  @media (prefers-reduced-motion: no-preference) {
    background-size: 1000% 100%;
    animation: ${gradientKeyframes} 30s linear infinite;
  }
`

export const BigPhoneNumber = ({ phoneNumber }: Props) => (
  <PhoneNumber>{phoneNumber}</PhoneNumber>
)
