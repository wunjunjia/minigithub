import { useRouter } from 'next/router'
import Link from 'next/link'

const List = ({ dataSource, renderItem }) => {
  return (
    <ul>
      {dataSource.map(data => renderItem(data))}
    </ul>
  )
}

List.Item = ({ children, style, queryString, query }) => {
  const router = useRouter()

  return (
    <>
      <li style={style}>
        <Link href={`/search${queryString({ ...router.query, ...query })}`}>
          <a>{children}</a>
        </Link>
      </li>
      <style jsx>{`
        li {
          padding: 4px 10px;
          border-radius: 4px;
          height: 29px;
        }
        li:hover {
          cursor: pointer;
          background-color: #f6f8fa;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          color: inherit;
        }
    `}</style>
    </>
  )
}

export default List
