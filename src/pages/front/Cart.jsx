import axios from "axios";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux"

import { asyncGetProducts } from "../../slices/productsSlice";
import { asyncGetCart } from "../../slices/cartSlice";
import cart from "../../assets/images/cart.png"

const url = import.meta.env.VITE_BASE_URL; 
const path = import.meta.env.VITE_API_PATH; 
function Cart() {
  const cartData = useSelector(state => state.cart.data);
  const productsData = useSelector(state => state.products.data);
  const dispatch = useDispatch();
  
  useEffect(() => {
    (async() => {
      dispatch(asyncGetCart())
      dispatch(asyncGetProducts())
    })()
  },[])

  //編輯購物車產品數量
  const editCartItem = async(id, product_id, qty) => {
    try {
      await axios.put(`${url}/api/${path}/cart/${id}`,{
        data:{
          product_id,
          qty:Number(qty)
        }
      })
      dispatch(asyncGetCart())
    } catch (error) {
      console.log(error);
    }
  }  

  //刪除購物車單一產品
  const deleteCartItem = async(id) => {
    try {
      await axios.delete(`${url}/api/${path}/cart/${id}`)
      dispatch(asyncGetCart())
    } catch (error) {
      console.log(error);
    }
  }

  //優惠券
  const [couponCode, setCouponCode] = useState('')

  const handleCoupon = async() => {
    const data = {
      data:{
        code:couponCode
      }
    }
    try {
      await axios.post(`${url}/api/${path}/coupon`, data)
      dispatch(asyncGetCart())
    } catch (error) {
      console.log(error);
    }
  }

  return(<>
    <div className="container pt-120">
      <div className="mt-3">
        <div className="mb-5">
          <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-center w-100 mt-md-0 mt-4">
            <li className="me-md-6 me-3 position-relative custom-step-line">
              <i className="bi bi-check-circle-fill d-md-inline d-none text-center me-1"></i>
              <i className="bi bi-1-circle-fill d-inline d-md-none text-center me-1"></i>
              <span className="text-nowrap">確認購物車</span>
            </li>
            <li className="me-md-6 me-3 position-relative custom-step-line">
              <i className="bi bi-check-circle d-md-inline d-none text-center me-1"></i>
              <i className="bi bi-2-circle d-inline d-md-none text-center me-1"></i>
              <span className="text-nowrap">填寫資料</span>
            </li>
            <li><i className="bi bi-check-circle d-md-inline d-none text-center me-1"></i>
            <i className="bi bi-3-circle d-inline d-md-none text-center me-1"></i>
            <span className="text-nowrap">完成訂單</span>
            </li>
          </ul>
        </div>
        {cartData?.carts?.length === 0 ? (
          <div className="text-center my-120">
            <img src={cart} alt="cart" />
            <h4 className="text-muted mb-3">您的購物車中沒有商品</h4>
            <Link type="button" className="btn btn-outline-dark" to="/products">去購物</Link>          
          </div>
        ) : (
          <div>
            <h3 className="fw-bold mt-3 mb-4">您的購物車</h3>
            <div className="row">
              <div className="col-md-8">
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th scope="col" className="border-0 ps-0">產品名稱</th>
                      <th scope="col" className="border-0">數量</th>
                      <th scope="col" className="border-0">價格</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData?.carts?.map((cartItem) => {
                      return(
                        <tr key={cartItem.id} className="border-bottom border-top">
                          <th scope="row" className="border-0 px-0 font-weight-normal py-4 d-flex align-items-center">
                            <img src={cartItem.product.imageUrl} alt="imageUrl" style={{width: "72px", height: "72px", objectFit: "cover"}}/>
                            <div className="ms-3 text-nowrap">
                              <Link to={`/product/${cartItem.product.id}`}>
                                <p className="text-dark mb-0 fw-bold d-inline-block">{cartItem.product.title}</p>
                              </Link>
                            </div>
                          </th>
                          <td className="border-0 text-center align-middle" style={{maxWidth: "160px"}}>
                            <div>
                              <button className={`btn btn-outline-dark border-0 py-2 ${cartItem.qty === 1 && 'disabled'}`} type="button" id="button-addon1"
                              onClick={() => editCartItem(cartItem.id, cartItem.product.id, cartItem.qty - 1)}>
                                <i className="bi bi-dash-lg"></i>
                              </button>
                              <span className="border-0 text-center px-0 px-lg-4 my-auto shadow-none">{cartItem.qty}</span>
                              <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2" 
                              onClick={() => editCartItem(cartItem.id, cartItem.product.id, cartItem.qty + 1)}>
                                <i className="bi bi-plus-lg"></i>
                              </button>
                            </div>
                          </td>
                          <td className="border-0 align-middle text-center">
                            <p className="mb-0 ms-auto"><del>NT${cartItem.product.origin_price}</del></p>
                            <p className="mb-0 ms-auto">NT${cartItem.product.price}</p>
                          </td>
                          <td className="border-0 align-middle text-center">
                            <button type="button" className="btn btn-outline-danger border-0" onClick={() => deleteCartItem(cartItem.id)}>
                            <i className="bi bi-trash3"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div className="input-group align-items-center w-50 mb-3">
                  <input type="text" className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none w-50" placeholder="請輸入折扣碼" aria-label="Recipient's username" aria-describedby="button-addon2"
                  value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>
                  <div className="input-group-append">
                    <button className={`btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0 `} type="button" id="button-addon2" onClick={() => handleCoupon()} ><i className="bi bi-send-fill"></i></button>
                  </div>
                  <span className="fs-7 text-dark300">如新增商品，請重新輸入折扣碼</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="border p-4 mb-4">
                  <h4 className="fw-bold mb-4">訂單明細</h4>
                  <table className="table text-muted border-bottom">
                    <tbody>
                      <tr>
                        <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">小計</th>
                        <td className="text-end border-0 px-0 pt-4">NT${cartData.total}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">優惠</th>
                        <td className="text-end border-0 px-0 pt-0 pb-4">-NT$${cartData.total - Math.round(cartData.final_total)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-between mt-4">
                    <p className="mb-0 h4 fw-bold">總價</p>
                    <p className="mb-0 h4 fw-bold">NT${Math.round(cartData.final_total)}</p>
                  </div>
                  <Link href="./checkout.html"className="btn btn-dark w-100 mt-4" to="/cart/checkout">下一步</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    {cartData?.carts?.length !== 0 && (
      <div>
        <div className="container">
          <h3 className="fw-bold mb-2">其他產品</h3>
        </div>
        <Swiper
            slidesPerView={1}
            spaceBetween={16}
            loop={true}
            breakpoints={{
              375:{
                slidesPerView:1
              },
              576:{
                slidesPerView:3
              },
              768:{
                slidesPerView:5
              }
            }}
          >
            {productsData.map((product) => {
              return(
                <SwiperSlide key={product.id}>
                  <Link to={`/product/${product.id}`} className="card border-0 rounded-0 overflow-hidden">
                    <img src={product.imageUrl} className="card-img-top rounded-0 d-block w-100 swiper-hover" alt="product"/>
                  </Link>
                  <div className="card-body text-center mt-2 p-0">
                    <Link to={`/product/${product.id}`} className="text-decoration-none text-dark100 h4">{product.title}</Link>
                    <p className="card-text mb-0">活動價 NT${product.price} <span className="text-muted "><del>NT${product.origin_price}</del></span></p>
                    <p className="text-muted mt-3"></p>
                  </div>
              </SwiperSlide>
              )
            })}
          </Swiper>
      </div>
    )}
  </>)
}

export default Cart