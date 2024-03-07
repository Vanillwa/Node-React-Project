import { useRef } from "react";
import { postPost } from "../api/api";
import { useUserStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";

function PostWrite() {
  const {user} = useUserStore();
  const navigate = useNavigate()

  const textarea = useRef();
  const handleResizeTextArea = (e) => {
    textarea.current.style.height = "auto"; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
    const title = e.target.title.value;
    const content = e.target.content.value;
    const writer = user.id
    // 포스트를 전송하는 로직
    try {
      const response = await postPost({ title, content, writer });
      navigate('/posts')
    } catch (error) {
      console.error("글 등록 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <section className='sec write-sec'>
      <div className='container'>
        <h2 className='title text-center'>글쓰기</h2>
        <form className='form d-flex flex-column gap-2' onSubmit={handleSubmit}>
          <input type='text' name='title' className='post-title' placeholder='제목'></input>
          <textarea name='content' className='post-content' cols={1} rows={1} placeholder='- 내용 -' onChange={handleResizeTextArea} ref={textarea}></textarea>
          <div className='btn-wrapper d-flex justify-content-end'>
            <button type='submit' className='submitBtn'>
              등록
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PostWrite;
