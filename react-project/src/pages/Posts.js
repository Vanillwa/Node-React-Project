import { useEffect, useMemo, useState } from "react";
import { getPosts } from "../api/api";
import { usePostStore } from "../stores/postStore";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import { useQuery } from "react-query";
import Pagination from "../components/Pagination";

function Posts() {
  console.log("Posts rendered");
  const navigate = useNavigate();
  // const [page, setPage] = useState(1);
  const { page, setPage } = usePostStore();
  const { status, data } = useQuery(["getPosts", { page }], () => getPosts({ page }), {
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // const handleOrderChange = (newOrder) => {
  //   setOrder(newOrder);
  // };

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
            <PostList status={status} posts={data?.data}></PostList>
          </tbody>
        </Table>
        <Pagination currentPage={page} totalPage={data?.totalPage} onPageChange={handlePageChange}></Pagination>
      </div>
    </section>
  );
}

function PostList({ status, posts }) {
  if (status == "loading") {
    return (
      <tr>
        <td colSpan={4} className='text-center'>
          로딩중...
        </td>
      </tr>
    );
  }

  if (status == "error") {
    return (
      <tr>
        <td colSpan={4} className='text-center'>
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

export default Posts;
