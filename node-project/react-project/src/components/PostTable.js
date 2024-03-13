import { Table } from "react-bootstrap";
import PostList from "./PostList";

function PostTable({status, posts}) {
  return (
    <Table hover variant='dark'>
      <thead className=''>
        <tr className=''>
          <th className='col-2 text-center'>글번호</th>
          <th className='col-6 text-center'>제목</th>
          <th className='col-2 text-center'>작성자</th>
          <th className='col-2 text-center'>작성일</th>
        </tr>
      </thead>
      <tbody>
        <PostList posts={posts} status={status}></PostList>
      </tbody>
    </Table>
  );
}

export default PostTable;