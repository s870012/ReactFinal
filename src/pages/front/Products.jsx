import axios from "axios"

import { Link } from "react-router"
import { useEffect, useState } from "react"

import Pagination from "../../components/Pagination"
import Search from "../../components/Search"

const url = import.meta.env.VITE_BASE_URL
const path = import.meta.env.VITE_API_PATH
function Products (){
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  
  const getProducts = async(page = 1) => {
    try {
      const res = await axios.get(`${url}/api/${path}/products?page=${page}`)
      setProducts(res.data.products)
      setPagination(res.data.pagination)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts()
  },[])

  return(<>
    <div className="position-relative d-flex align-items-center justify-content-center" style={{minHeight: "400px"}}>
      <div className="position-absolute" style={{top:"0", bottom: "0", left: "0", right: "0", backgroundImage: `url(https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,backgroundSize: "cover", backgroundPosition: "center center", opacity: "0.3"}}></div>
      <h2 className="fs-1 fw-bold">新鮮出爐 溫暖每一天</h2>
    </div>
    <div className="container mt-md-5 mt-3 mb-7">
      <div className="row">
        <div className="col-md-4">
          <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
            <div className="card border-0">
              <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">
                    Lorem ipsum
                  </h4>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="card-body py-0">
                  <ul className="list-unstyled">
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">
                    Lorem ipsum
                  </h4>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="card-body py-0">
                  <ul className="list-unstyled">
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingThree" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">
                    Lorem ipsum
                  </h4>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="card-body py-0">
                  <ul className="list-unstyled">
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            {products.map((product) => {
              return(
                <div key={product.id} className="col-md-6">
                  <div className="card border-0 mb-4 position-relative position-relative">
                    <img src={product.imageUrl} className="card-img-top rounded-0 object-fit-cover" height="400px" alt="productImage"/>
                    <a href="#" className="text-dark">
                      <i className="far fa-heart position-absolute" style={{right: "16px", top: "16px"}}></i>
                    </a>
                    <div className="card-body p-0">
                      <Link className="fs-4 fw-bold text-decoration-none text-dark mb-0 mt-3" to={`/product/${product.id}`}>{product.title}</Link>
                      <p className="card-text mb-0">NT${product.price} <span className="text-muted "><del>NT${product.origin_price}</del></span></p>
                      <p className="text-muted mt-3"></p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <nav className="d-flex justify-content-center">
            <Pagination products={products} getProducts={getProducts} pagination={pagination} />
          </nav>
        </div>
      </div>
    </div>
    <Search/>
  </>)
}

export default Products