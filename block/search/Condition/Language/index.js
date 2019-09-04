import { useEffect, useState, useCallback, memo, useMemo } from 'react'
import { Select } from 'antd'
import Router from 'next/router'
import { Panel, List } from '../UI'

const { Item } = List
const { Option } = Select

const Language = memo(({ queryString, language, activeStyle, isMobile }) => {
  const languages = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Ruby', 'Python']

  return (
    isMobile ? (
      <Select
        defaultValue={language}
        onChange={(val) => {
          const str = queryString({
            ...Router.query,
            language: val
          })
          Router.push(`/search${str}`)
        }}
        placeholder="Language"
        style={{ width: '100%', marginBottom: 20 }}
      >
        {languages.map(item => <Option value={item} key={item}>{item}</Option>)}
      </Select>
    ) : (
      <Panel title="Language">
        <List
          dataSource={languages}
          renderItem={(data) => (
            <Item
              key={data}
              style={language === data ? activeStyle : {}}
              query={{ language: data }}
              queryString={queryString}
            >
              {data}
            </Item>
          )}
        />
      </Panel>
    )
  )
})

export default Language
