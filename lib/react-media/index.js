import { useState, useEffect } from 'react'

const throttle = (delay) => {
  let timer = void 0
  return (query, setMatch) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      const width = window.innerWidth
      let match = void 0
      const { minWidth, maxWidth } = query
      if (minWidth) {
        match = width >= minWidth
      }
      if (maxWidth) {
        match = match === false ? false : width <= maxWidth
      }
      setMatch(match)
    }, delay)
  }
}

export default ({query, children}) => {
  const [match, setMatch] = useState()

  useEffect(() => {
    const fn = throttle(50).bind(null, query, setMatch)
    window.addEventListener('resize', fn)
    window.dispatchEvent(new Event('resize'))
    return () => {
      window.removeEventListener('resize', fn)
    }
  }, [])

  return typeof match === 'undefined' ? null : children(match)
}
