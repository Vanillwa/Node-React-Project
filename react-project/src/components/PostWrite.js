import { create } from "zustand";

const newPostStore = create((set) => ({
  title: "",
  content: "",
  setTitle: (newTitle) => set({ title: newTitle }),
  setContent: (newContent) => set({ content: newContent }),
}));

function PostWrite() {
  const title = newPostStore((state) => state.title);
  const content = newPostStore((state) => state.content);
  const setTitle = newPostStore((state) => state.setTitle);
  const setContent = newPostStore((state) => state.setContent);

  function postSubmit(e) {
    e.preventDefault();
    // console.log(title, content)
    const body = JSON.stringify({ title, content });
    console.log(body);
    fetch("http://localhost:8081/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  }

  return (
    <>
      <section className='sec write-sec'>
        <div className='container-lg'>
          <h2 className='title'>Create Post!</h2>
          <form className='row' onSubmit={(e) => postSubmit(e)}>
            <div className='wrapper'>
              <label htmlFor='new-post-title'>Title</label>
              <input type='text' name='title' id='new-post-title' onChange={(e) => setTitle(e.target.value)} required></input>
            </div>
            <div className='wrapper'>
              <label htmlFor='new-post-content'>Content</label>
              <textarea name='content' id='new-post-content' onChange={(e) => setContent(e.target.value)} required></textarea>
            </div>
            <div className='btn-wrapper'>
              <button type='submit' className='btn btn-secondary'>
                Create
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default PostWrite;
