import { useState } from 'react'

import { getRandomColor } from '@styles/theme'

export const useRandomColor = (avoidDuplicates = true) => {
  const [color, setColor] = useState(getRandomColor())

  const changeColor = () =>
    setColor(prevColor =>
      getRandomColor(avoidDuplicates ? prevColor : undefined)
    )

  return { color, changeColor }
}
