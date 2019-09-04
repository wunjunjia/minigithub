import Link from 'next/link'
import { Icon } from 'antd'
import moment from 'moment'

export default ({ repository }) => (
  <div className="root">
    <div className="primary">
      <Link href={`/detail/readme?owner=${repository.owner.login}&name=${repository.name}`}>
        <a>
          {repository.full_name}
        </a>
      </Link>
      <p>
        {repository.description}
      </p>
      {repository.license ? <span>{repository.license.name}</span> : null}
      <span>
        {moment(repository.updated_at)
          .fromNow()}
      </span>
    </div>
    <div className="language">
      {repository.language}
    </div>
    <div className="star">
      <Icon type="star"/>
      &nbsp;
      <span>
        {repository.watchers >= 1000 ? `${Math.floor(repository.watchers / 1000)}k` : repository.watchers}      </span>
    </div>
    <style jsx>{`
      .root {
        display: flex;
        flex-wrap: wrap;
      }
      .root > .primary {
        flex-basis: 70%;
      }
      .root > .language {
        flex-basis: 20%;
      }
      .root > .star {
        flex-basis: 10%;
      }
      .root > .primary > a {
        color: #0366d6;
        font-weight: 600;
        font-size: 20px;
        word-break: break-word;
      }
      .root > .primary > a:hover {
        text-decoration: underline;
      }
      .root > .primary > p {
        width: 70%;
        margin-bottom: 8px;
      }
      .root > .primary > span {
        font-size: 12px;
      }
      .root > .primary > span + span {
        margin-left: 10px;
      }
      @media screen and (max-width: 767px) {
        .root > .primary {
          flex-basis: 100%;
        }
        .root > .language {
          flex-basis: 50%;
        }
        .root > .star {
          flex-basis: 50%;
        }
        .root > .primary > p {
          width: 100%;
        }
      }
    `}</style>
  </div>
)
