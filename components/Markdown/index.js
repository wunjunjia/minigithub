import { memo, useEffect, useRef } from 'react'
import marked from 'marked'
import 'github-markdown-css'

export default memo(({ content }) => {
  const ref = useRef()

  useEffect(() => {
    const children = Array.prototype.slice.call(ref.current.children)
    children
      .filter(item => item.nodeName === 'IMG')
      .forEach(item => item.style.width = '100%')
  }, [])

  return (
    <div
      ref={ref}
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: marked(content) }}
    />
  )
})
