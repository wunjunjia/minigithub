import axios from 'axios'

const isServer = typeof window === 'undefined'

const request =  (config, req) => {
  if (isServer) {
    let headers = {}
    const { accessToken, tokenType } = req.session
    if (accessToken && tokenType) {
      headers.Authorization = `${tokenType} ${accessToken}`
    }
    return axios({
      ...config,
      url: `https://api.github.com${config.url}`,
      headers
    })
  } else {
    return axios({
      ...config,
      url: `/api${config.url}`
    })
  }
}

export default request


