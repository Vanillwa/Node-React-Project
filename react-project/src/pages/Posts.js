import PostList from "../components/PostList"
import PostWrite from "../components/PostWrite"

function Posts(){
  return(
    <>
      <h2>Posts</h2>
      <PostWrite></PostWrite>
      <PostList></PostList>
    </>
  )
}

export default Posts