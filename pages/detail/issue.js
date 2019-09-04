import { useState, useCallback } from 'react'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import moment from 'moment'
import request from '../../utils/http'
import Markdown from '../../components/Markdown'
import withDetail from '../../hoc/withDetail'
import IssueFilter from '../../block/detail/issue/IssueFilter'

const Item = ({ issue }) => {
  const [show, setShow] = useState(false)

  return (
    <li>
      <div className="header">
        <div className="avatar">
          <img src={issue.user.avatar_url} alt="avatar"/>
        </div>
        <div className="title">
          <h2>{issue.title}</h2>
          <p>Updated at {moment(issue.updated_at).fromNow()}</p>
          <Button
            type="primary"
            onClick={() => {
              setShow(!show)
            }}
          >
            {show ? '关闭' : '查看'}
          </Button>
        </div>
      </div>
      {show ? <Markdown content={issue.body}/> : null}
      <style jsx>{`
        .header {
          display: flex;
          padding: 20px;
          border-top: 1px solid #eee;
        }
        .header:hover {
          background-color: #f1f1f1;
        }
        .avatar {
          flex-basis: 8%;
          min-width: 40px;
        }
        .avatar img {
          width: 100%;
          max-width: 100%;
          vertical-align: middle;
        }
        .title {
          flex-basis: 92%;
          padding-left: 20px;
        }
        .title h2 {
          word-break: break-word;
        }
        @media screen and (max-width: 767px) {
          .header {
            padding: 10px;
          }
        }
      `}</style>
    </li>
  )
}

const Issue = ({ initIssues, labels, isMobile }) => {
  const [issues, setIssues] = useState(initIssues)

  const router = useRouter()

  const search = useCallback(async ({ creator, state, label }) => {
    let arr = []
    if (creator) {
      arr.push(`creator=${creator}`)
    }
    if (state) {
      arr.push(`state=${state}`)
    }
    if (label) {
      arr.push(`labels=${label.join(',')}`)
    }
    const { owner, name } = router.query
    const result = await request({
      url: `/repos/${owner}/${name}/issues?${arr.join('&')}`,
      method: 'GET'
    })
    setIssues(() => result.data)
  })

  return (
    <div style={{ marginTop: 20 }}>
      <IssueFilter labels={labels} isMobile={isMobile} search={search}/>
      <ul>
        {issues.map(issue => <Item key={issue.id} issue={issue}/>)}
      </ul>
    </div>
  )
}

Issue.getInitialProps = async ({ ctx }) => {
  const { name, owner } = ctx.query
  const result = await Promise.all([
    request({
      url: `/repos/${owner}/${name}/issues`,
      method: 'GET'
    }, ctx.req),
    request({
      url: `/repos/${owner}/${name}/labels`,
      method: 'GET'
    }, ctx.req),
  ])
  return {
    initIssues: result[0].data,
    labels: result[1].data
  }
}

export default withDetail(Issue)
