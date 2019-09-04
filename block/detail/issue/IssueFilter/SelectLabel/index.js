import { Select } from 'antd'
import { memo } from 'react'

const Option = Select.Option

export default memo(({ handleChange, label, labels, isMobile }) => (
  <Select
    mode="multiple"
    value={label}
    onChange={handleChange}
    placeholder="标签"
    style={{
      flexBasis: isMobile ? '100%' : '50%',
      marginBottom: 20
    }}
  >
    {labels.map(item => <Option value={item.name} key={item.id}>{item.name}</Option>)}
  </Select>
))
