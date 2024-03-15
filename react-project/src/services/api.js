import axios from "axios";

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// post 단일 조회
export async function getPost({ id }) {
  const res = await instance.get(`/api/posts/${id}`);
  const data = res.data;
  return data;
}

// post list 조회
export async function getPosts({ page = 1, limit = 15, order = "DESC" }) {
  const queryString = `?order=${order}&page=${page}&limit=${limit}`;
  const res = await instance.get(`/api/posts${queryString}`);
  const data = res.data;
  return data;
}

// export async function getPostsById({id, limit = 15, order = "DESC"}){
//   const queryString = `?order=${order}&id=${id}&limit=${limit}`;
//   const res = await instance.get(`${BASE_URL}/getPostsById${queryString}`);
//   const data = res.data;
//   return data;
// }

// post 작성
export async function postPost(body) {
  const res = await instance.post(`/api/posts`, body);
  const data = res.data;
  return data;
}

// post 삭제
export async function deletePost(id) {
  const res = await instance.delete(`/api/posts/${id}`);
  const data = res.data;
  return data;
}

// post 업데이트
export async function putPost(body){
  const res = await instance.put(`/api/posts/${body.id}`, body);
  const data = res.data;
  return data;
}