import { getPosts } from "../services/api";
import { usePostStore } from "../stores/postStore";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Pagination from "../components/Pagination";
import PostTable from "../components/PostTable";

function Posts() {
  console.log("Posts rendered");
  const navigate = useNavigate();
  const { page, setPage } = usePostStore();
  
  // post list 조회
  const { status, data } = useQuery(["getPosts", { page }], () => getPosts({ page }), {
    retry: 0,
    refetchOnWindowFocus: false,
  });

  // 페이지 이동시 page state 변경
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // 게시판 정렬 방식 변경
  // const handleOrderChange = (newOrder) => {
  //   setOrder(newOrder);
  // };

  if (status === "success") console.log(data.data);

  return (
    <>
      <section className='sec list-sec'>
        <div className='container'>
          {/* <h2 className='title text-center'>글 목록</h2> */}
          <div className='bar d-flex justify-content-end'>
            <div className='filter'></div>
            <div className='btn-wrapper'>
              <button type='button' className='btns listBtn' onClick={() => navigate("/posts")}>
                목록으로
              </button>
              <button type='button' className='btns writeBtn' onClick={() => navigate("/posts/write")}>
                글쓰기
              </button>
            </div>
          </div>
          <PostTable posts={data?.data} status={status}></PostTable>
          <Pagination currentPage={page} totalPage={data?.totalPage} onPageChange={handlePageChange}></Pagination>
        </div>
      </section>
    </>
  );
}

export default Posts;
