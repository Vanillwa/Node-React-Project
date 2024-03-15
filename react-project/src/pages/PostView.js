import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPost } from "../services/api";
import { usePostStore } from "../stores/postStore";
import styles from "../styles/PostView.module.css"

function PostView() {
  console.log("View Rendered");
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { onUpdate, setOnUpdate } = usePostStore();

  // post 조회
  const { status, data } = useQuery(["getPost", { id }], () => getPost({ id }), {
    retry: 0,
    refetchOnWindowFocus: false,
  });

  // post 삭제 mutation
  const { mutate } = useMutation((id) => deletePost(id), {
    onSettled: () => {
      queryClient.resetQueries("getPosts");
    },
    onSuccess: () => {
      navigate("/posts");
    },
  });

  // post 삭제 핸들러
  const handleDeletePost = () => {
    if (!window.confirm("정말 게시글을 지우시겠습니까?")) return;
    mutate(id);
  };

  const onUpdatePost = () => {
    setOnUpdate(!onUpdate);
    navigate(`/posts/${id}/update`);
  };

  if (status === "loading") return <div className='fetch-alert text-center'>로딩중...</div>;
  if (status === "error") return <div className='fetch-alert text-center'>게시글 조회 실패</div>;

  return (
    <section className='sec view-sec'>
      <div className='container'>
        <hr></hr>
        <div className='post-wrapper'>
          <div className='post-title border-tb'>{data.title}</div>
          <div className='post-info d-flex justify-content-between'>
            <span>작성자 : {data.User.nickname}</span>
            <span>작성일 : {data.createdAt}</span>
          </div>
          <div className={styles.postContent}>{data.content}</div>
        </div>
        <div className='btn-wrapper justify-content-end gap-2'>
          <button type='button' className='btns' onClick={onUpdatePost}>
            수정
          </button>
          <button type='button' className='btns' onClick={handleDeletePost}>
            삭제
          </button>
        </div>
      </div>
    </section>
  );
}

export default PostView;
