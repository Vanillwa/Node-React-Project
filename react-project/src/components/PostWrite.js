import { postPost } from "../api";
import { useState } from "react";

function PostWrite(props) {
  const {onPostSubmit } = props
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    writer: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify(newPost);
    await postPost(body);
    setNewPost({ title: "", content: "", writer: 1 });
    onPostSubmit();
    e.target.reset();
  };

  return (
    <section className='sec write-sec'>
      <div className='container'>
        <h2 className='title text-center pb-4'>Create Post!</h2>
        <form className='form row row-cols-1 gap-4' onSubmit={handleSubmit}>
          <div className='wrapper col d-flex justify-content-center'>
            <label htmlFor='new-post-title' className='col-2'>
              Title
            </label>
            <input type='text' name='title' id='new-post-title' className='col-8' onChange={handleChange} required></input>
          </div>
          <div className='wrapper col d-flex justify-content-center'>
            <label htmlFor='new-post-content' className='col-2'>
              Content
            </label>
            <textarea name='content' id='new-post-content' className='col-8' onChange={handleChange} required></textarea>
          </div>
          <div className='btn-wrapper col text-center'>
            <button type='submit' className='btn btn-secondary'>
              Create
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PostWrite;
