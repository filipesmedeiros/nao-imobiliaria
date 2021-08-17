import { useState, useEffect } from 'react'

export const useMediaQuery = (query: string, needsResizeListener = false) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    if (needsResizeListener) {
      const listener = () => setMatches(media.matches)
      window.addEventListener('resize', listener)
      return () => window.removeEventListener('resize', listener)
    }
  }, [matches, query, needsResizeListener])

  return matches
}
