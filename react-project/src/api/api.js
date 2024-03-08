import axios from "axios";

const BASE_URL = "http://localhost:8081";

export async function getPost(id) {
  const res = await axios.get(`${BASE_URL}/posts/${id}`);
  const data = await res.data;
  return data;
}

export async function getPosts({ page = 1, limit = 10, order = "DESC" }) {
  const queryString = `?order=${order}&page=${page}&limit=${limit}`;
  const res = await axios.get(`${BASE_URL}/posts${queryString}`);
  const data = await res.data;
  return data;
}

export async function postPost(body) {
  const res = await axios.post(`${BASE_URL}/posts`, body);
  const data = await res.data;
  return data;
}
