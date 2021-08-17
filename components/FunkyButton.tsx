import styled from '@emotion/styled'

import { gradientKeyframes } from '@styles/keyframes'

export const FunkyButton = styled.button`
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 0.2rem;

  padding: 1.5rem;

  border-radius: 3px;
  border: none;

  background-color: #d888ec;
  color: white;

  :hover {
    cursor: pointer;
  }

  @media (prefers-reduced-motion: reduce) {
    :hover {
      background-color: #88d0ec;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    :hover {
      animation: ${gradientKeyframes} 30s linear infinite;
      background-image: linear-gradient(
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
      background-size: 1000% 100%;
    }
  }
`
