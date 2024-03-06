function Post(props){
  const {el} = props
  return(
    <li>
      <div className="inner">
        <div className="left">
          <div className="post-title">{el.title}</div>
          <div className="post-content">{el.content}</div>
        </div>
        <div className="right">
          <div className="post-id">{el.id}</div>
          <div className="post-nickname">{el.nickname}</div>
          <div className="post-date">{el.createdAt}</div>
        </div>
      </div>
    </li>
  )
}

export default Post;