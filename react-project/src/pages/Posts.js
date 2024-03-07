import { useEffect } from "react";
import { getPosts } from "../api/api";
import { usePostStore } from "../stores/postStore";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
function Posts() {
  const { posts, setPosts } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePostsLoad = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    handlePostsLoad();
  }, [setPosts]);

  return (
    <section className='sec list-sec'>
      <div className='container'>
        <h2 className='title text-center'>글 목록</h2>
        <div className='bar d-flex justify-content-end'>
          <div className='filter'></div>
          <button
            type='button'
            className='writeBtn'
            onClick={() => {
              navigate("/posts/write");
            }}>
            글쓰기
          </button>
        </div>
        <Table hover variant='dark'>
          <thead className=''>
            <tr className=''>
              <th className='col-1 text-center'>글번호</th>
              <th className='col-6 text-center'>제목</th>
              <th className='col-3 text-center'>작성자</th>
              <th className='col-2 text-center'>작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => {
              return <Post key={post.id} post={post} i={i}></Post>;
            })}
          </tbody>
        </Table>
      </div>
    </section>
  );
}

export default Posts;
