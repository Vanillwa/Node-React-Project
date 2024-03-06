function Post(props) {
  const { el } = props;
  let date = new Date(el.createdAt).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <li className='item d-flex'>
      <div className='inner left col-1 d-flex align-items-center'>
        <div className='post-id'>{el.id}</div>
      </div>
      <div className='inner middle col-8'>
        <div className='post-title'>{el.title}</div>
        <div className='post-content'>{el.content}</div>
      </div>
      <div className='inner right col-3 text-center d-flex flex-column justify-content-around'>
        <div className='post-nickname'>{el.User?.nickname}</div>
        <div className='post-date'>{date}</div>
      </div>
    </li>
  );
}

export default Post;
