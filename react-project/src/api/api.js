import axios from "axios";

const BASE_URL = 'http://localhost:8081';

export async function getPosts() {
  const res = await axios.get(`${BASE_URL}/posts`);
  const data = await res.data;
  return data
}

export async function postPost(body) {
  const res = await axios.post(`${BASE_URL}/posts`, body);
}
