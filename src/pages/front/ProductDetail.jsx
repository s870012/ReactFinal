import axios from "axios"

//swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import 'swiper/css'
import 'swiper/css/navigation'

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"

const url = import.meta.env.VITE_BASE_URL
const path = import.meta.env.VITE_API_PATH
function ProductDetail (){
  const { id } = useParams()
  const [product, setProduct] = useState({});
  const [cartQty, setCartQty] = useState(1);

  useEffect(() => {
    (async() => {
      try {
        const res = await axios.get(`${url}/api/${path}/product/${id}`)
        setProduct(res.data.product)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [id])

  const addCartItem = async (product_id, qty) => {
    try {
      await axios.post(`${url}/api/${path}/cart`, {
        data:{
          product_id,
          qty:Number(qty)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return(<>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-7">
          <Swiper
            modules={[Navigation]}
            navigation
          >
            {product.imagesUrl?.map((item, index) => {
              return(
                <SwiperSlide key={index}>
                  <img src={item} alt="" style={{height:"400px", width:"100%",objectFit:"cover"}}/>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <div className="col-md-5">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-white px-0 mb-0 py-3">
              <li className="breadcrumb-item"><Link className="text-muted" to="/">首頁</Link></li>
              <li className="breadcrumb-item"><Link className="text-muted" to="/products">商品</Link></li>
              <li className="breadcrumb-item active" aria-current="page">介紹</li>
            </ol>
          </nav>
          <h2 className="fw-bold h1 mb-1">{product.title}</h2>
          <p className="mb-0 text-muted text-end"><del>NT${product.origin_price}</del></p>
          <p className="h4 fw-bold text-end">NT${product.price}</p>
          <div className="row align-items-center">
            <div className="col-6">
              <select id="qtySelect" className="form-select form-select border-0 text-center my-auto shadow-none bg-light"
                value={cartQty}
                onChange={(e) => setCartQty(e.target.value)}
              >
                {Array.from({length:10}).map((_, index) => {
                  return(
                    <option key={index} value={index + 1}>
                      {index +1}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="col-6">
              <button type="button" className="text-nowrap btn btn-dark w-100 py-2" onClick={() => addCartItem(product.id, cartQty)}>加入購物車</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-4">
          <p>{product.description}</p>
        </div>
        <div className="col-md-3">
          <p className="text-muted">{product.content}</p>
        </div>
      </div>
      <h3 className="fw-bold">其他產品</h3>
      <Swiper>
        <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="card-img-top rounded-0 w-50" alt="..."/>
          <a href="#" className="text-dark"></a>
          <div className="card-body p-0">
            <h4 className="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
            <p className="card-text mb-0">NT$1,080 <span className="text-muted "><del>NT$1,200</del></span></p>
            <p className="text-muted mt-3"></p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="card-img-top rounded-0 w-50" alt="..."/>
          <a href="#" className="text-dark"></a>
          <div className="card-body p-0">
            <h4 className="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
            <p className="card-text mb-0">NT$1,080 <span className="text-muted "><del>NT$1,200</del></span></p>
            <p className="text-muted mt-3"></p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </>)
}

export default ProductDetail