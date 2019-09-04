import { memo, useMemo, useCallback } from 'react'
import Language from './Language'
import Sort from './Sort'

export default memo(({ language, order, sort, queryString, isMobile }) => {
  const activeStyle = useMemo(() => ({
    backgroundColor: '#0366d6',
    color: 'white'
  }), [])

  return (
    <div className="root">
      <Language
        queryString={queryString}
        language={language}
        activeStyle={activeStyle}
        isMobile={isMobile}
      />
      <Sort
        queryString={queryString}
        order={order}
        sort={sort}
        activeStyle={activeStyle}
        isMobile={isMobile}
      />
      <style jsx>{`
        .root {
          box-sizing: border-box;
          max-width: 250px;
          flex-basis: 25%;
          padding: 0 8px;
        }
        @media screen and (max-width: 767px) {
          .root {
            max-width: 100%;
            flex-basis: 100%;
          }
        }
      `}</style>
    </div>
  )
})
