import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

const url = import.meta.env.VITE_BASE_URL
const path = import.meta.env.VITE_API_PATH
function Home (){
  const [products, setProducts] = useState([]);
  
  const getProducts = async() => {
    try {
      const res = await axios.get(`${url}/api/${path}/products/all`)
      setProducts(res.data.products)
    } catch (error) {
      console.log(error);
    }
  }

  const filterProducts = products.filter(product => product.origin_price < 65)  

  useEffect(() => {
    getProducts();
  },[])
  
  return(<>
    <section className="container">
      <div className="row flex-md-row-reverse flex-column">
        <div className="col-md-6">
          <img src="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img-fluid"/>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
          <h2 className="fw-bold">每一口，都是對美味的堅持</h2>
          <h5 className="font-weight-normal text-muted mt-2">
            用心烘焙，為您帶來的不僅是美味，還有每天的幸福與歡樂<br/>在這裡，幸福是隨手可得的
          </h5>
          <div className="input-group mb-0 mt-4">
            <input type="text" className="form-control rounded-0" placeholder="輸入電子郵件，訂閱最新消息" />
            <div className="input-group-append">
              <button className="btn btn-dark rounded-0" type="button" id="search">
                訂閱
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 mt-md-4">
          <div className="card border-0 mb-4 position-relative position-relative">
            <img
              src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
              className="card-img-top rounded-0"
              alt="..."
            />
            <div className="card-body p-0">
              <h4 className="mb-0 mt-4">Lorem ipsum</h4>
              <div className="d-flex justify-content-between mt-3">
                <p className="card-text text-muted mb-0 w-75">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod.
                </p>
                <button className="btn btn-outline-dark rounded-0 text-nowrap">
                  Lorem ipsum
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-md-4">
          <div className="card border-0 mb-4 position-relative position-relative">
            <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" className="card-img-top rounded-0" alt="..."
            />
            <div className="card-body p-0">
              <h4 className="mb-0 mt-4">Lorem ipsum</h4>
              <div className="d-flex justify-content-between mt-3">
                <p className="card-text text-muted mb-0 w-75">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod.
                </p>
                <button className="btn btn-outline-dark rounded-0 text-nowrap">
                  Lorem ipsum
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-md-4">
          <div className="card border-0 mb-4 position-relative position-relative">
            <img
              src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
              className="card-img-top rounded-0"
              alt="..."
            />
            <div className="card-body p-0">
              <h4 className="mb-0 mt-4">Lorem ipsum</h4>
              <div className="d-flex justify-content-between mt-3">
                <p className="card-text text-muted mb-0 w-75">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod.
                </p>
                <button className="btn btn-outline-dark rounded-0 text-nowrap">
                  Lorem ipsum
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-md-4">
          <div className="card border-0 mb-4 position-relative position-relative">
            <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" className="card-img-top rounded-0" alt="..."
            />
            <div className="card-body p-0">
              <h4 className="mb-0 mt-4">Lorem ipsum</h4>
              <div className="d-flex justify-content-between mt-3">
                <p className="card-text text-muted mb-0 w-75">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod.
                </p>
                <button className="btn btn-outline-dark rounded-0 text-nowrap">
                  Lorem ipsum
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-light mt-7">
      <div className="container">
        <div className="row justify-content-center py-7">
          <div className="col-md-8 d-flex">
            <img src="https://media.istockphoto.com/id/517059150/photo/baker-holding-baguettes-at-the-manufacturing.jpg?s=612x612&w=0&k=20&c=3rtryROS8DEkkvtiD1_z-3O644Tv8-lumUPxGsCfhlw=" alt="chef" className="rounded-circle me-5" style={{width: '160px', height: '160px', objectFit: 'cover'}}/>
            <div className="d-flex flex-column">
              <p className="h5 fw-bold">Black Heart</p>
              <p className="h5">以一顆對食物的熱愛與敬意，踏入了烘焙的世界。將每一塊麵包都視為藝術品，力求每一口都能帶來溫暖與幸福。</p>
              <p className="mt-auto text-muted">Black Heart — 烘焙師傅</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="container py-5">
      <h2 className="text-center fw-bold mb-4">熱門商品</h2>
      <Swiper
        slidesPerView={3}
        >
        {filterProducts.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <div className="text-center">
                <img src={product.imagesUrl[1]} alt="" style={{width: '300px', height: '220px', objectFit: 'cover'}}/>
                <h4 className="fw-bold my-1">{product.title} </h4>
                <p>NT${product.price} <del className="fs-6">NT${product.origin_price}</del></p>
                <Link to={`/product/${product.id}`} type="button" className="btn btn-dark mt-2">查看更多</Link>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
    <section className="bg-light py-7 position-relative">
      <div className="promote-bg promote-bg-position"></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 text-center promote-content">
            <h3 className="text-nowrap fw-bold">新鮮出爐，幸福滿滿</h3>
            <p className="text-dark">美味不等人，趕快來品嚐我們的手工烘焙<br/>讓幸福從每一口開始</p>
            <button className="btn btn-dark mt-4 rounded-2">探尋美味</button>
          </div>
        </div>
      </div>
    </section>
  </>)
}

export default Home;