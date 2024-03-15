import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, putPost } from "../services/api";
import styles from "../styles/PostUpdate.module.css"
import TextareaAutosize from 'react-textarea-autosize';

export default function PostUpdate() {
  console.log("Update Rendered");
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { status, data } = useQuery(["getPost", { id }], () => getPost({ id }), {
    retry: 0,
    refetchOnWindowFocus: false,
  });


  const { mutate } = useMutation((body) => putPost(body), {
    onSettled: () => {
      queryClient.resetQueries("getPosts");
      queryClient.resetQueries("getPost");
    },
    onSuccess: () => {
      navigate(`/posts/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const writer = data.writer
    mutate({ id, title, content, writer });
  };

  // 작성 취소
  const handleCancle = () => {
    if (!window.confirm("작성한 모든 내용이 사라집니다.\n정말 취소하시겠습니까?")) return;
    navigate(-1);
  };

  if (status === "success") console.log("view data : ", data);
  if (status === "loading") return <div className='text-center'>로딩중...</div>;
  if (status === "error") return <div className='text-center'>게시글 조회 실패</div>;

  return (
    <section className='sec write-sec'>
      <div className='container'>
        <h2 className='title text-center'>글 수정</h2>
        <form className='form d-flex flex-column gap-2' onSubmit={handleSubmit}>
          <input type='text' name='title' className='post-title' placeholder='제목' defaultValue={data.title} required></input>
          <TextareaAutosize name="content" className={styles.postContent} defaultValue={data.content} placeholder='- 내용 -' required></TextareaAutosize>
          <div className='btn-wrapper d-flex justify-content-end gap-2'>
            <button type='button' className='btns cancleBtn' onClick={handleCancle}>
              취소
            </button>
            <button type='submit' className='btns submitBtn'>
              등록
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
