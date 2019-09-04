import LRU from 'lru-cache'

const cache = new LRU({
  maxAge: 1000 * 10
})

export default cache
