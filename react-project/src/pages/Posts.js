import { useEffect } from "react";
import { getPosts } from "../api/api";
import { usePostStore } from "../stores/postStore";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import { useQuery } from "react-query";
import Pagination from "../components/Pagination";

function Posts() {
  const navigate = useNavigate();
  const { page, setPage, setOrder, totalPage } = usePostStore();
  const handlepagechange = (newPage) => {
    setPage(newPage);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  };

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
              <th className='col-7 text-center'>제목</th>
              <th className='col-2 text-center'>작성자</th>
              <th className='col-2 text-center'>작성일</th>
            </tr>
          </thead>
          <tbody>
            <PostList></PostList>
          </tbody>
        </Table>
        <Pagination onPageChange={handlepagechange}></Pagination>
      </div>
    </section>
  );
}

function PostList() {
  const { posts, setPosts, page, setPage, limit, setLimit, order, setOrder, totalPage, setTotalPage } = usePostStore();
  const { status, data } = useQuery(["getPosts", { page, limit, order }], () => getPosts({ page, limit, order }), {
    retry: 0,
    refetchOnWindowFocus: false,
  });
  console.log(data)

  useEffect(() => {
    if (status === "success") {
      setPosts(data.data);
      setTotalPage(data.totalPage);
    }
  }, [status, data, setPosts, setTotalPage]);

  if (status === "loading")
    return (
      <tr>
        <td colSpan={4} className='text-center'>
          로딩중...
        </td>
      </tr>
    );
  if (status === "error")
    return (
      <tr>
        <td colSpan={4} className='text-center'>
          게시글 조회 실패
        </td>
      </tr>
    );

  return (
    <>
      {data.data.map((post, i) => {
        return <Post key={post.id} post={post} i={i}></Post>;
      })}
    </>
  );
}

export default Posts;
