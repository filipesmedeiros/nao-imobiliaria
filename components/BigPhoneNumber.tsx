import styled from '@emotion/styled'

import { gradientKeyframes } from '@styles/keyframes'

export interface Props {
  phoneNumber: string
}

const PhoneNumber = styled.h1`
  font-weight: 900;
  font-size: 5rem;
  text-align: center;
  letter-spacing: 0.5rem;

  background: linear-gradient(
    to right,
    #d888ec,
    #c098fa,
    #a8a6ff,
    #93b2ff,
    #83bcff,
    #7cc4fd,
    #7ecbf5,
    #88d0ec,
    #7ecbf5,
    #7cc4fd,
    #83bcff,
    #93b2ff,
    #a8a6ff,
    #c098fa,
    #d888ec
  );
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
