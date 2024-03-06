import { create } from "zustand";
import Post from "./Post";

const postsStore = create((set) => ({
  posts: [],
  post: null,
  getPosts: async () => {
    const response = await fetch("http://localhost:8081/posts");
    const data = await response.json();
    set({ posts: data });
  },
  // getPost: async (id) => {
  //   const response = await fetch(`http://localhost:8081/posts/${id}`);
  //   const data = await response.json();
  //   set({ post: data });
  // },
}));

function PostList() {
  const { posts, getPosts } = postsStore();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className='sec list-sec'>
      <div className='container-lg'>
        <h2 className='title'>Post List!</h2>
        <ul className='list-wrapper'>
          {posts.map((el) => {
            return <Post key={el.id} el={el}></Post>;
          })}
        </ul>
      </div>
    </section>
  );
}

export default PostList;
