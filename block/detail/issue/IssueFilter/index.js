import { Button } from 'antd'
import { useCallback, useState } from 'react'
import SelectCreator from './SelectCreator'
import SelectState from './SelectState'
import SelectLabel from './SelectLabel'

const IssueFilter = ({ labels, isMobile, search }) => {
  const [creator, setCreator] = useState()
  const [state, setState] = useState()
  const [label, setLabel] = useState()
  const [loading, setLoading] = useState(false)

  const handleCreatorChange = useCallback((val) => {
    setCreator(() => val)
  }, [])

  const handleStateChange = useCallback((val) => {
    setState(() => val)
  }, [])

  const handleLabelChange = useCallback((val) => {
    setLabel(val)
  }, [])

  const handleClick = useCallback(async () => {
    setLoading(() => true)
    await search({creator, state, label})
    setLoading(() => false)
  }, [creator, state, label])

  return (
    <div className="root">
      <SelectCreator handleChange={handleCreatorChange} creator={creator} isMobile={isMobile} />
      <SelectState handleChange={handleStateChange} state={state} isMobile={isMobile} />
      <SelectLabel handleChange={handleLabelChange} label={label} labels={labels} isMobile={isMobile} />
      <Button
        type="primary"
        style={{ flexBasis: isMobile ? '100%' : '5%', marginBottom: 20 }}
        onClick={handleClick}
        disabled={loading}
      >检索</Button>
      <style jsx>{`
        .root {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      `}</style>
    </div>
  )
}

export default IssueFilter
