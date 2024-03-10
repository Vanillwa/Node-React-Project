import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPost } from "../api/api";
import { useEffect } from "react";
import { usePostStore } from "../stores/postStore";

function PostView() {
  const { id } = useParams();
  const { post, setPost } = usePostStore();
  const { status, data } = useQuery(["getPost", id], async () => await getPost(id), {
    retry: 0,
    refetchOnWindowFocus: false,
  });
  console.log("view data : ", data);

  if (status === "loading")
    return (
      <div className='text-center'>
        로딩중...
      </div>
    );
  if (status === "error")
    return (
      <div className='text-center'>
        게시글 조회 실패
      </div>
    );

  return (
    <section className='sec view-sec'>
      <div className='container'>
        <div className='post-title'>{data.title}</div>
        <hr></hr>
        <div className='post-content'>{data.content}</div>
        <hr></hr>
        <div className='post-info'>
          <span>작성자 : {data.User.nickname} | </span>
          <span>작성일 : {data.createdAt}</span>
        </div>
      </div>
    </section>
  );
}

export default PostView;
