import { Select } from 'antd'
import { useCallback, useRef, useState, memo } from 'react'
import request from '../../../../../utils/http'

const Option = Select.Option

export default memo(({ handleChange, creator, isMobile }) => {
  const requestId = useRef(0)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = useCallback((delay) => {
    let timer = void 0
    return (val) => {
      if (timer) clearTimeout(timer)
      if (val === '') return
      requestId.current += 1
      const beforeId = requestId.current
      timer = setTimeout(async () => {
        setLoading(() => true)
        const result = await request({
          url: `/search/users`,
          method: 'GET',
          params: {
            q: val
          }
        })
        setLoading(() => false)
        const currentId = requestId.current
        if (beforeId !== currentId) return
        const creators = result.data.items.map(item => {
          return {
            value: item.login,
            text: item.login
          }
        })
        setData(creators)
      }, delay)
    }
  }, [])

  return (
    <Select
      style={{
        flexBasis: isMobile ? '100%' : '20%',
        marginBottom: 20
      }}
      allowClear
      showSearch
      value={creator}
      placeholder="创建者"
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch(500).bind(null)}
      onChange={handleChange}
      notFoundContent={<span>nothing</span>}
      loading={loading}
    >
      {data.map(item => <Option key={item.value} value={item.value}>{item.text}</Option>)}
    </Select>
  )
})
