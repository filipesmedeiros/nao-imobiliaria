import { keyframes } from '@emotion/react'

export const gradientKeyframes = (
  direction: 'top' | 'right' | 'bottom' | 'left'
) => keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: ${
      direction === 'top'
        ? '0% 1000%'
        : direction === 'right'
        ? '1000% 0%'
        : direction === 'bottom'
        ? '0% -1000%'
        : '-1000% 0%'
    };
  }
`
