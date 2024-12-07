const PaginationComponent = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Tính tổng số trang
    
    // Nếu không có sản phẩm, không cần hiển thị pagination
    if (totalPages <= 1) return null;
  
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    };
  
    return (
      <div className="pagination">
        {/* Nút Previous */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
  
        {/* Hiển thị danh sách các trang */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
  
        {/* Nút Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default PaginationComponent;
  