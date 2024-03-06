export async function postPost(body) {
  fetch("http://localhost:8081/posts", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
}

export async function getPosts() {
  let res = await fetch("http://localhost:8081/posts");
  let data = await res.json();
  return data;
}
