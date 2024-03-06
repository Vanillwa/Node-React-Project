import { useState } from "react";
import PostList from "../components/PostList";
import PostWrite from "../components/PostWrite";

function Posts() {
  const [refresh, setRefresh] = useState(false);
  const handlePostSubmit = () => {
    // 새로운 글이 작성되면 refresh 상태를 토글하여 PostList를 다시 렌더링하도록 함
    setRefresh(!refresh);
  };
  return (
    <>
      <PostWrite onPostSubmit={handlePostSubmit}></PostWrite>
      <PostList refresh={refresh}></PostList>
    </>
  );
}

export default Posts;
