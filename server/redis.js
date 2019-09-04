const Redis = require('ioredis')

const redis = new Redis()

function prefixSessionId(sid) {
  return `sessionId:${sid}`
}

async function get(sid) {
  const data = await redis.get(prefixSessionId(sid))
  if(!data) {
    return null
  }
  try {
    return JSON.parse(data)
  } catch (e) {
    console.log(e)
  }
}

async function set(sid, data, ttl) {
  try {
    data = JSON.stringify(data)
    sid = prefixSessionId(sid)
    if (ttl) {
      ttl = Math.ceil(ttl / 1000)
      await redis.setex(sid, ttl, data)
    } else {
      await redis.set(sid, data)
    }
  } catch (e) {
    console.log(e)
  }
}

async function destroy(sid) {
  await redis.del(prefixSessionId(sid))
}

module.exports = {
  get,
  set,
  destroy
}
