import { base64_to_utf8 } from '../../utils/common'
import request from '../../utils/http'
import withDetail from '../../hoc/withDetail'
import Markdown from '../../components/Markdown'

const Readme = ({ readme }) => (
  <div style={{ marginTop: 20 }}>
    <Markdown content={base64_to_utf8(readme.content)}/>
  </div>
)


Readme.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query
  let readme = {
    content : ''
  }
  try {
    const result = await request({
      url: `/repos/${owner}/${name}/readme`,
      method: 'GET'
    }, ctx.req)
    readme.content = result.data.content
  } catch (e) {
    console.log('get /repos/:owner/:name/readme fail')
  }

  return {
    readme
  }
}

export default withDetail(Readme)
