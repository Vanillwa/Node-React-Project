import { getPosts } from "../api/api";
import { usePostStore } from "../stores/postStore";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Pagination from "../components/Pagination";
import PostTable from "../components/PostTable";

function Posts() {
  console.log("Posts rendered");
  const navigate = useNavigate();
  const { page, setPage, posts, setPosts } = usePostStore();
  const { status, data } = useQuery(["getPosts", { page }], () => getPosts({ page }), {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setPosts(data.data);
    },
  });
  if (status === "success") {
    console.log(data);
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // const handleOrderChange = (newOrder) => {
  //   setOrder(newOrder);
  // };

  return (
    <>
      <section className='sec list-sec'>
        <div className='container'>
          {/* <h2 className='title text-center'>글 목록</h2> */}
          <div className='bar d-flex justify-content-end'>
            <div className='filter'></div>
            <div className='btn-wrapper'>
              {}
              <button
                type='button'
                className='btns listBtn'
                onClick={() => {
                  navigate("/posts");
                }}>
                목록으로
              </button>
              <button
                type='button'
                className='btns writeBtn'
                onClick={() => {
                  navigate("/posts/write");
                }}>
                글쓰기
              </button>
            </div>
          </div>
          <PostTable posts={posts} status={status}></PostTable>
          <Pagination currentPage={page} totalPage={data?.totalPage} onPageChange={handlePageChange}></Pagination>
        </div>
      </section>
    </>
  );
}

export default Posts;
