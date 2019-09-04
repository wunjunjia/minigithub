export default ({ title, children }) => {
  return (
    <div className="root">
      <h1>{title}</h1>
      {children}
      <style jsx>{`
      .root {
        border: 1px solid #e1e4e8;
        border-radius: 5px;
        padding: 16px;
        margin-bottom: 20px;
      }
      .root h1 {
        font-size: 16px;
        font-weight: 600;
      }
    `}</style>
    </div>
  )
}
