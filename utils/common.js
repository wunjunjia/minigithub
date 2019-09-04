import atob from 'atob'

export function log(content) {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    console.log('server log')
  } else {
    console.log('client ', content)
  }
}

export function base64_to_utf8(content) {
  return decodeURIComponent(escape(atob(content)))
}
