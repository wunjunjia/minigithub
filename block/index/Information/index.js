import { connect } from 'react-redux'
import { Icon } from 'antd'

const Information = ({ user }) => (
  <div className="information">
    <div className="information-primary">
      <div className="avatar-container">
        <img className="avatar" src={user.data.avatar_url} alt="logo"/>
      </div>
      <div>
        <p style={{
          fontSize: '26px',
          fontWeight: 700,
          marginBottom: 0
        }}>{user.data.login}</p>
        <p style={{
          fontSize: '20px',
          fontWeight: 300,
          color: '#666',
          marginBottom: 16
        }}>{user.data.name}</p>
      </div>
    </div>
    <div>
      <Icon type="mail"/>
      <a href={`mailto:${user.data.email}`} style={{ marginLeft: 10 }}>{user.data.email}</a>
    </div>
    <style jsx>{`
      .information {
        width: 24%;
      }
      .information-primary {
        width: 100%;
        display: flex;
        flex-direction: column
      }
      .avatar-container {
        width: 100%;
        margin-bottom: 16px;
      }
      .avatar {
        width: 100%;
        vertical-align: middle;
      }
      @media screen and (min-width: 768px) and (max-width: 991px) {
        .information {
          width: 30%;
        }
      }
      @media screen and (max-width: 767px) {
        .information {
          width: 100%;
        }
        .avatar-container {
          width: 30%;
          margin-right: 16px;
        }
        .information-primary {
          flex-direction: row;
        }
      }
    `}</style>
  </div>
)

const mapStateToProps = (store) => ({
  user: store.user
})

export default connect(mapStateToProps, null)(Information)
