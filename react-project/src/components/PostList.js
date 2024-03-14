import Post from "./Post";

function PostList({ status, posts }) {
  if (status === "loading") {
    return (
      <tr>
        <td colSpan={4} className='fetch-alert text-center'>
          로딩중...
        </td>
      </tr>
    );
  }
  if (status === "error") {
    return (
      <tr>
        <td colSpan={4} className='fetch-alert text-center'>
          게시글 조회 실패
        </td>
      </tr>
    );
  }
  return (
    <>
      {posts.map((post, i) => {
        return <Post key={post.id} post={post} i={i}></Post>;
      })}
    </>
  );
}

export default PostList;
