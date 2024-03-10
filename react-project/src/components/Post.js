import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const navigate = useNavigate();
  let date = post.createdAt;
  post.createdAt = new Date(date).toLocaleDateString("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" }).replace(/\//g, "-");

  const handleClick = ()=>{
    navigate(`/posts/${post.id}`)
  }

  return (
    <tr>
      <td className='col-2 post-id text-center' onClick={()=>handleClick()}>{post.id}</td>
      <td className='col-6 post-title' onClick={()=>handleClick()}>{post.title}</td>
      <td className='col-2 text-center'>{post.User?.nickname}</td>
      <td className='col-2 text-center'>{post.createdAt}</td>
    </tr>
  );
}

export default Post;
