import Post from "./Post";

function PostList({ posts }) {
  return (
    <>
      {posts.map((post, i) => {
        return <Post key={post.id} post={post} i={i}></Post>;
      })}
    </>
  );
}

export default PostList;
