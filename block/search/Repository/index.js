import {  Pagination } from 'antd'
import { memo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Repository } from '../../../components'

export default memo(({ repos, queryString, pageSize, isMobile }) => {
  const router = useRouter()

  const { page } = router.query
  return (
    <div className="root">
      <ul>
        {
          repos.items.map(item => (
            <li className="item" key={item.id}>
              <Repository repository={item} />
            </li>
          ))
        }
      </ul>
      <div style={{ textAlign: 'center' }}>
        <Pagination
          size={ isMobile ? 'small' : 'large' }
          defaultCurrent={Number(page) || 1}
          pageSize={Number(pageSize)}
          total={repos.total_count <= 1000 ? repos.total_count : 1000 }
          itemRender={(page, type, originalElement) => {
            const value = type === 'prev' ? 'previous' : ( type === 'next' ? 'next' : page )
            return (
              <Link href={`/search${queryString({ ...router.query, page })}`}>
                <a>{value}</a>
              </Link>
            )
          }}
        />
      </div>
      <style jsx>{`
        .root {
          padding: 0 8px;
          flex-basis: 75%;
        }
        .item {
          padding: 24px 0;
          border-top: 1px solid #e1e4e8;
        }
        @media screen and (max-width: 767px) {
          .root {
            flex-basis: 100%;
          }
        }
      `}</style>
    </div>
  )
})
