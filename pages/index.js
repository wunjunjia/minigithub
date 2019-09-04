import { useCallback, useEffect } from 'react'
import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import request from '../utils/http'
import cache from '../utils/cache'
import Information from '../block/index/Information'
import Repository from '../components/Repository'

const { TabPane } = Tabs

const Index = ({ owner_repos, star_repos }) => {
  const router = useRouter()

  const key = router.query.key || 'owner'

  useEffect(() => {
    if (owner_repos) {
      cache.set('owner_repos', owner_repos)
    }
    if (star_repos) {
      cache.set('star_repos', star_repos)
    }
  }, [owner_repos, star_repos])

  const handleChange = useCallback((key) => {
    router.push({
      pathname: '/',
      query: {
        key
      }
    })
  }, [])

  return (
    <div className="root">
      <Information/>
      <div className="repository">
        <Tabs activeKey={key} animated={false} onChange={handleChange}>
          <TabPane tab="你的仓库" key="owner">
            {owner_repos.map(repo => (
              <li key={repo.id} style={{
                padding: '20px 0',
                borderBottom: '1px solid #eee'
              }}>
                <Repository repository={repo}/>
              </li>
            ))}
          </TabPane>
          <TabPane tab="你关注的仓库" key="star">
            {star_repos.map(repo => (
              <li key={repo.id} style={{
                padding: '20px 0',
                borderBottom: '1px solid #eee'
              }}>
                <Repository repository={repo}/>
              </li>
            ))}
          </TabPane>
        </Tabs>
      </div>
      <style jsx>{`
        .root {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .repository {
          flex-grow: 1;
          padding-left: 20px;
        }
        @media screen and (max-width: 767px) {
          .repository {
            padding: 0;
          }
        }
      `}</style>
    </div>
  )
}

Index.getInitialProps = async (ctx) => {
  const { req } = ctx.ctx
  if (!cache.get('owner_repos') && !cache.get('star_repos')) {
    const result = await Promise.all([
      request({
        url: '/user/repos',
        method: 'GET'
      }, req),
      request({
        url: '/user/starred',
        method: 'GET'
      }, req)
    ])
    cache.set('owner_repos', result[0].data)
    cache.set('star_repos', result[1].data)
  } else if (!cache.get('owner_repos')) {
    const result = await request({
      url: '/user/repos',
      method: 'GET'
    }, req)
    cache.set('owner_repos', result.data)
  } else if(!cache.get('star_repos')){
    const result = await request({
      url: '/user/starred',
      method: 'GET'
    }, req)
    cache.set('star_repos', result.data)
  }

  return {
    owner_repos: cache.get('owner_repos'),
    star_repos: cache.get('star_repos')
  }
}

export default Index
