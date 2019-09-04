const koa = require('koa')
const Router = require('koa-router')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const next = require('next')
const axios = require('axios')
const redisStore = require('./server/redis')
const { CLIENT_ID, CLIENT_SECRET, GITHUB_OAUTH_URL } = require('./config')

const app = next({ dev: true })
const handle = app.getRequestHandler()

const router = new Router()

router.get('/redirectURL', async (ctx) => {
  let { url, ...rest } = ctx.query
  Object.keys(rest).forEach(key => {
    url = `${url}&${key}=${rest[key]}`
  })
  ctx.session.redirectURL = url
  ctx.redirect(GITHUB_OAUTH_URL)
})

router.get('/auth', async (ctx) => {
  const { code } = ctx.query
  if (!code) {
    ctx.body = '<h1>The code is lost</h1>'
    return
  }
  const tokenResult = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code
  }, {
    headers: {
      Accept: 'application/json'
    }
  })
  if (tokenResult.status === 200) {
    if (tokenResult.data.error) {
      ctx.body = '<h1>code expired</h1>'
      return
    }
    const { access_token, token_type } = tokenResult.data
    const userResult = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `${token_type} ${access_token}`
      }
    })
    if (userResult.status === 200) {
      ctx.session.accessToken = access_token
      ctx.session.tokenType = token_type
      ctx.session.user = userResult.data
      ctx.redirect(ctx.session.redirectURL || '/')
      return
    }
  }
  ctx.body = '<h1>server error</h1>'
})

router.post('/logout', async (ctx) => {
  ctx.session = null
  ctx.body = JSON.stringify({
    code: 0,
    message: 'ok'
  })
})

app.prepare()
  .then(() => {
    const server = new koa()
    server.keys = ['my mini github']
    const SESSION_CONFIG = {
      // key: 'mini'
      store: redisStore
    }

    server.use(bodyParser())

    server.use(session(SESSION_CONFIG, server))

    server.use(async (ctx, next) => {
      const path = ctx.path
      if (path.startsWith('/api/')) {
        try {
          let headers = {}
          const { accessToken, tokenType } = ctx.session
          if (accessToken && tokenType) {
            headers.Authorization = `${tokenType} ${accessToken}`
          }
          const result = await axios({
            method: ctx.method,
            url: `https://api.github.com${ctx.url.replace('/api/', '/')}`,
            data: ctx.request.body,
            headers
          })
          ctx.status = result.status
          ctx.body = result.data
        } catch (e) {
          ctx.status = 500
          ctx.body = JSON.stringify({
            code: 1,
            message: 'server error'
          })
        }
      } else {
        await next()
      }
    })

    server.use(router.routes())

    server.use(async (ctx, next) => {
      ctx.req.session = ctx.session
      await handle(ctx.req, ctx.res)
      ctx.response = false
    })

    server.listen(3000, () => {
      console.log('server started at port 3000')
    })
  })
