import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import request from '../utils/http'
import { Condition, Repository } from '../block/search'
import cache from '../utils/cache'

const queryString = ({ q, language, sort, order, page, per_page }) => {
  let str = `?q=${q}`
  if (language) {
    str = `${str}&language=${language}`
  }
  if (sort) {
    str = `${str}&sort=${sort}`
  }
  if (order) {
    str = `${str}&order=${order}`
  }
  str = `${str}&page=${page || 1}&per_page=${per_page}`
  return str
}

const Search = ({ repos, per_page, isMobile }) => {
  useEffect(() => {
    repos.items.forEach(repo => {
      cache.set(repo.full_name, repo)
    })
  }, [])

  const router = useRouter()

  const { language, sort, order } = router.query

  return (
    <div className="root">
      <Condition
        language={language}
        sort={sort}
        order={order}
        queryString={queryString}
        isMobile={isMobile}
      />
      <Repository
        repos={repos}
        queryString={queryString}
        pageSize={per_page}
        isMobile={isMobile}
      />
      <style jsx>{`
        .root {
          max-width: 992px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  )
}

Search.getInitialProps = async ({ ctx }) => {
  const {
    q,
    language,
    sort,
    order,
    page = 1,
    per_page = 10
  } = ctx.query
  let queryString = `?q=${q}`
  if (language) {
    queryString = `${queryString}+language:${language}`
  }
  if (sort) {
    queryString = `${queryString}&sort=${sort}`
  }
  if (order) {
    queryString = `${queryString}&order=${order}`
  }
  queryString = `${queryString}&page=${page}&per_page=${per_page}`
  let repos = {
    total_count: 0,
    items: []
  }
  try {
    const result = await request({
      url: `/search/repositories${queryString}`,
      method: 'GET'
    }, ctx.req)
    repos.total_count = result.data.total_count
    repos.items = result.data.items
  } catch (e) {
    console.log('get /search/repositories fail')
  }

  return {
    repos,
    per_page
  }
}

export default Search
