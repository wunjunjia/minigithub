import { useRouter } from 'next/router'
import { Repository } from '../components'
import request from '../utils/http'
import cache from '../utils/cache'

export default (Com) => {
  const withDetail = ({ repository, ...rest }) => {
    const router = useRouter()

    const { owner, name } = router.query

    const activeStyle = {
      height: 32,
      borderBottom: '2px solid #f00'
    }

    return (
      <div>
        <Repository repository={repository}/>
        <div style={{ display: 'flex' }}>
          <a
            style={router.pathname.startsWith('/detail/readme') ? activeStyle : {}}
            href={`/detail/readme?owner=${owner}&name=${name}`}>
            Readme
          </a>
          <a
            style={router.pathname.startsWith('/detail/issue') ? activeStyle : {}}
            href={`/detail/issue?owner=${owner}&name=${name}`}>
            Issue
          </a>
        </div>
        <Com {...rest}/>
        <style jsx>{`
          a {
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 16px;
          }
          a + a {
            margin-left: 20px;
          }
        `}</style>
      </div>
    )
  }

  withDetail.getInitialProps = async (ctx) => {
    const { ctx: { query, req } } = ctx
    const { owner, name } = query
    let repository = cache.get(`${owner}/${name}`)
    if (!repository) {
      const result = await request({
        url: `/repos/${owner}/${name}`,
        method: 'GET'
      }, req)
      repository = result.data
    }
    let props = {}
    if (typeof Com.getInitialProps === 'function') {
      props = await Com.getInitialProps(ctx)
    }
    return {
      ...props,
      repository
    }
  }

  return withDetail
}
