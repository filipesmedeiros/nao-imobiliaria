import styled from '@emotion/styled'

import { gradientKeyframes } from '@styles/keyframes'
import { gradientWithLoop } from '@styles/theme'

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
      animation: ${({
          direction = 'top',
        }: {
          direction?: 'top' | 'right' | 'bottom' | 'left'
        }) => gradientKeyframes(direction)}
        20s linear infinite;
      background-image: linear-gradient(
        ${({ direction = 'top' }) => `to ${direction}`},
        ${gradientWithLoop}
      );
      background-size: ${({ direction = 'top' }) =>
        direction === 'top' || direction === 'bottom'
          ? '100% 1000%'
          : '1000% 100%'};
    }
  }
`
