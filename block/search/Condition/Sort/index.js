import { memo } from 'react'
import { Select } from 'antd'
import Router from 'next/router'
import { List, Panel } from '../UI'

const { Item } = List
const { Option } = Select

export default memo(({ queryString, sort, order, activeStyle, isMobile }) => {
  const sorts = [
    {
      name: 'Best Match',
      value: 'best match'
    },
    {
      name: 'Most Stars',
      value: 'stars',
      order: 'desc'
    },
    {
      name: 'Fewest Stars',
      value: 'stars',
      order: 'asc'
    },
    {
      name: 'Most Forks',
      value: 'forks',
      order: 'desc'
    },
    {
      name: 'Fewest Forks',
      value: 'forks',
      order: 'asc'
    }
  ]

  const getDefaultSelectValue = () => {
    if (sort) {
      const result = sorts.find(item => item.value === sort && item.order === order)
      return result.name
    }
  }

  return (
    isMobile ? (
      <Select
        onChange={val => {
          const { value, order } = sorts.find(item => item.name === val)
          const str = queryString({
            ...Router.query,
            sort: value,
            order
          })
          Router.push(`/search${str}`)
        }}
        defaultValue={getDefaultSelectValue()}
        placeholder="Sort"
        style={{ width: '100%', marginBottom: 20 }}
      >
        {sorts.map(item => <Option value={item.name} key={item.name}>{item.name}</Option>)}
      </Select>
    ) : (
      <Panel title="Sort">
        <List
          dataSource={sorts}
          renderItem={(data) => (
            <Item
              key={data.name}
              style={data.value === sort && data.order === order ? activeStyle : {}}
              query={{ sort: data.value, order: data.order }}
              queryString={queryString}
            >
              {data.name}
            </Item>
          )}
        />
      </Panel>
    )
  )
})
