import Post from "./Post";
import { getPosts } from "../api";
import { useEffect, useState } from "react";

function PostList(props) {
  const {refresh} = props
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // getPosts 함수를 사용하여 데이터를 가져옴
    getPosts()
      .then((data) => {
        // 가져온 데이터를 상태에 설정
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [refresh]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함
  return (
    <section className='sec list-sec'>
      <div className='container'>
        <h2 className='title text-center'>Post List!</h2>
        <ul className='item-wrapper d-flex flex-column gap-3'>
          {posts.map((el) => {
            return <Post key={el.id} el={el}></Post>;
          })}
        </ul>
      </div>
    </section>
  );
}

export default PostList;
