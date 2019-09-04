import { Spin } from 'antd'

export default () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .1)'
  }}>
    <Spin size="large"/>
  </div>
)
