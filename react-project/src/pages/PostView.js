import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPost } from "../api/api";
import { usePostStore } from "../stores/postStore";

function PostView() {
  console.log("View Rendered");
  const { id } = useParams();
  const { post, setPost } = usePostStore();
  const { status, data } = useQuery(["getPost", {id}], ()=> getPost({id}),{
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess : (data)=>{
      setPost(data)
    }
  })

  if (status === "success") {
    console.log("view data : ", data);
  }
  if (status === "loading") return <div className='text-center'>로딩중...</div>;
  if (status === "error") return <div className='text-center'>게시글 조회 실패</div>;

  return (
    <section className='sec view-sec'>
      <div className='container'>
        <hr></hr>
        <div className='post-wrapper'>
          <div className='post-title border-tb'>{post.title}</div>
          <div className='post-info d-flex justify-content-between'>
            <span>작성자 : {post.User.nickname}</span>
            <span>작성일 : {post.createdAt}</span>
          </div>
          <div className='post-content'>{post.content}</div>
        </div>
        <hr></hr>
      </div>
    </section>
  );
}

export default PostView;
