import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { Button } from 'antd'

const Authentication = ({ login, children }) => {
  const router = useRouter()

  return login ? children : (
    <div className="root">
      <p className="desc">亲，您还没有登录哦~</p>
      <Button
        type="primary"
        href={`/redirectURL?url=${router.asPath}`}
        style={{ width: 200 }}
      >
        登录
      </Button>
      <style jsx>{`
        .root {
          text-align: center;
          padding-top: 50px;
        }
        .desc {
          font-size: 18px;
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = store => ({
  login: store.user.login
})

export default connect(mapStateToProps, null)(Authentication)




