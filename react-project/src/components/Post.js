function Post({post}) {
  let date = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <tr>
      <td className="text-center">{post.id}</td>
      <td>{post.title}</td>
      <td className="text-center">{post.User?.nickname}</td>
      <td className="text-center">{date}</td>
    </tr>
  );
}

export default Post;
