import PropTypes from "prop-types";

function Pagination ({pagination, getProducts, products}){
  const handlePageChange = (e, page) => {
    e.preventDefault();
    getProducts(page)
  }

  return (<>
    {products.length === 0 ? '' : (
      <nav>
        <ul className="pagination">
          <li className={`page-item ${pagination.has_pre ? '' : 'disabled'}`}>
            <a href="#" className="page-link" onClick={(e) => handlePageChange(e, pagination.current_page - 1)}>上一頁</a>
          </li>
          {Array.from({length:pagination.total_pages}).map ((_, index) => {
            return (<li className={`page-item ${pagination.current_page === index +1 ? 'active' : ''}`} key={index}>
              <a className="page-link" href="#" onClick={(e) => handlePageChange(e, index + 1)}>
                {index + 1 }
              </a>
            </li>)
          })}
          <li className={`page-item ${pagination.has_next ? '' : 'disabled'}`}>
            <a className="page-link" href="#" onClick={(e) => handlePageChange(e, pagination.current_page + 1)}>下一頁</a>
          </li>
        </ul>
      </nav>
    )}
  </>)
}

Pagination.propTypes = { 
  pagination: PropTypes.shape({
    total_pages: PropTypes.number,
    current_page: PropTypes.number,
    has_pre: PropTypes.bool,
    has_next: PropTypes.bool,
  }).isRequired,
  handlePageChange: PropTypes.func,
  getProducts: PropTypes.func,
  products: PropTypes.shape({
    category: PropTypes.string,
    content: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    origin_price: PropTypes.number,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    length: PropTypes.number
  })
}

export default Pagination