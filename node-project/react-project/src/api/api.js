import axios from "../lib/axiosConfig"

const BASE_URL = "http://localhost:8081";

export async function getPost({id}) {
  const res = await axios.get(`${BASE_URL}/getPost/${id}`);
  const data = res.data;
  return data;
}

export async function getPosts({ page = 1, limit = 15, order = "DESC" }) {
  const queryString = `?order=${order}&page=${page}&limit=${limit}`;
  const res = await axios.get(`${BASE_URL}/getPosts${queryString}`);
  const data = res.data;
  return data;
}

export async function getPostsById({id, limit = 15, order = "DESC"}){
  const queryString = `?order=${order}&id=${id}&limit=${limit}`;
  const res = await axios.get(`${BASE_URL}/getPostsById${queryString}`);
  const data = res.data;
  return data;
}

export async function postPost(body) {
  const res = await axios.post(`${BASE_URL}/posts`, body);
  const data = res.data;
  return data;
}
