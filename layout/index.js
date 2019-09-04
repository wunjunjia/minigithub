import { useState, useCallback } from 'react'
import { Layout, Icon, Input, Avatar, Dropdown, Menu, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { logout } from '../store/reducers/user'

const { Header, Content, Footer } = Layout

const BaseLayout = ({ children, user, logout }) => {
  const router = useRouter()

  const [search, setSearch] = useState(router.query.q || '')

  const handleChange = useCallback((e) => {
    setSearch(e.target.value.trim())
  }, [setSearch])

  const handleSearch = useCallback((e) => {
    if (search !== '') {
      router.push(`/search?q=${search}&page=1&per_page=10`)
    }
  }, [search])

  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>
        退出
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Layout>
        <Header style={{ padding: 0 }}>
          <div className="header">
            <div className="header-left">
              <Link href="/">
                <div className="icon">
                  <Icon type="github"/>
                </div>
              </Link>
              <div className="search">
                <Input.Search
                  placeholder="搜索仓库"
                  value={search}
                  onChange={handleChange}
                  onSearch={handleSearch}
                />
              </div>
            </div>
            <div className="header-right">
              {
                user.login ? (
                  <Dropdown overlay={menu}>
                    <Avatar size={40} src={user.data.avatar_url}/>
                  </Dropdown>
                ) : (
                  <Tooltip title="点击登录">
                    <a href={`/redirectURL?url=${router.asPath}`}>
                      <Avatar size={40} icon="user"/>
                    </a>
                  </Tooltip>
                )
              }
            </div>
          </div>
        </Header>
        <Content style={{ padding: '0 16px', backgroundColor: '#fff' }}>
          <div className="container">
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>底部</Footer>
      </Layout>
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          padding: 0 16px;
        }
        .header-left {
          display: flex;
          justify-content: space-between;
        }
        .icon {
          font-size: 32px;
          margin-right: 20px;
          color: #fff;
        }
        .search {
          width: 210px;
        }
        .container {
          box-sizing: border-box;
          width: 100%;
          max-width: 1200px;
          margin: 20px auto 10px auto;
          min-height: calc(100vh - 163px);
          border-radius: 5px;
          position: relative;
        }
      `}</style>
      <style jsx global>{`
        ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        @media screen and (max-width: 586px) {
          .hidden-xs {
            display: none;
          }
        }
        @media screen and (min-width: 587px) and (max-width: 767px) {
          .hidden-sm {
            display: none;
          }
        }
        @media screen and (min-width: 768px) and (max-width: 991px) {
          .hidden-md {
            display: none;
          }
        }
        @media screen and (min-width: 992px) and (max-width: 1199px) {
          .hidden-lg {
            display: none;
          }
        }
        @media screen and (min-width: 1200px) {
          .hidden-xl {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

const mapStateToProps = (store) => ({
  user: store.user
})

export default connect(mapStateToProps, { logout })(BaseLayout)
