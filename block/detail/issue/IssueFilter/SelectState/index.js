import { Select } from 'antd'
import { memo } from 'react'

const Option = Select.Option

export default memo(({ handleChange, state, isMobile }) => (
  <Select
    style={{
      flexBasis: isMobile ? '100%' : '20%',
      marginBottom: 20
    }}
    placeholder="状态"
    value={state}
    onChange={handleChange}
  >
    <Option value="all">all</Option>
    <Option value="closed">closed</Option>
    <Option value="open">open</Option>
  </Select>
))
