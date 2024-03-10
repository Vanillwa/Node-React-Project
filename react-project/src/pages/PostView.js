import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
import { getPost, getPostsById } from "../api/api";
import PostTable from "../components/PostTable";
import { usePostStore } from "../stores/postStore";

function PostView() {
  console.log("View Rendered");
  const { id } = useParams();
  const { posts } = usePostStore();
  const { status, data } = useQueries([
    {queryKey : ['getPost', id], queryFn : getPost(id)},
    {queryKey : ['getPostsById', id], queryFn : getPostsById({id}) } // 작성해야댐
  ]
  );
  //   ["getPost", id], async () => await getPost(id), {
  //   retry: 0,
  //   refetchOnWindowFocus: false,
  // });

  if (status === "success") {
    console.log("view data : ", data);
  }
  if (status === "loading") return <div className='text-center'>로딩중...</div>;
  if (status === "error") return <div className='text-center'>게시글 조회 실패</div>;

  return (
    <section className='sec view-sec'>
      <div className='container'>
        {/* <h2 className='title'>글 조회</h2> */}
        <hr></hr>
        <div className='post-wrapper'>
          <div className='post-title border-tb'>{data.title}</div>
          <div className='post-info d-flex justify-content-between'>
            <span>작성자 : {data.User.nickname}</span>
            <span>작성일 : {data.createdAt}</span>
          </div>
          <div className='post-content'>{data.content}</div>
        </div>
        <hr></hr>
        <PostTable posts={posts}></PostTable>
      </div>
    </section>
  );
}

export default PostView;
