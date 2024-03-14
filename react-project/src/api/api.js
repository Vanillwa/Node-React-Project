import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

// const instance = axios.create({
//   baseURL: API_URL
// });

export async function getPost({id}) {
  const res = await axios.get(`${API_URL}/api/posts/${id}`);
  const data = res.data;
  return data;
}

export async function getPosts({ page = 1, limit = 15, order = "DESC" }) {
  console.log("url : ", process.env.REACT_APP_API_URL)
  const queryString = `?order=${order}&page=${page}&limit=${limit}`;
  const res = await axios.get(`${API_URL}/api/posts${queryString}`);
  const data = res.data;
  return data;
}

// export async function getPostsById({id, limit = 15, order = "DESC"}){
//   const queryString = `?order=${order}&id=${id}&limit=${limit}`;
//   const res = await instance.get(`${BASE_URL}/getPostsById${queryString}`);
//   const data = res.data;
//   return data;
// }

export async function postPost(body) {
  const res = await axios.post(`${API_URL}/api/posts`, body);
  const data = res.data;
  return data;
}
