function Pagination({ currentPage, totalPage, onPageChange }) {
  
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, currentPage + 2);
  if(currentPage <= 2){
    endPage = 5
  }
  if(currentPage >= totalPage - 2){
    startPage = totalPage - 4
  }
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <span key={i} style={{ cursor: "pointer", textDecoration: currentPage === i ? "underline" : "none" }} onClick={() => onPageChange(i)}>
        {i}
      </span>
    );
  }
  return (
    <div className='pagination d-flex justify-content-center gap-2'>
      {!(currentPage === 1) && (
        <span onClick={() => onPageChange(currentPage - 5)} style={{ cursor: "pointer" }}>
          ◀
        </span>
      )}
      {pages}
      {!(currentPage === totalPage) && (
        <span onClick={() => onPageChange(currentPage + 5)} style={{ cursor: "pointer" }}>
          ▶
        </span>
      )}
    </div>
  );
}

export default Pagination;
