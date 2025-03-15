import axios from "axios";

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux"

import { asyncGetCart } from "../../slices/cartSlice";
import cart from "../../assets/images/cart.png"

const url = import.meta.env.VITE_BASE_URL; 
const path = import.meta.env.VITE_API_PATH; 
function Cart() {
  const cartData = useSelector(state => state.cart.data);
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    (async() => {
      dispatch(asyncGetCart())
    })()
  },[dispatch])

  //編輯購物車產品數量
  const editCartItem = async(id, product_id, qty) => {
    try {
      await axios.put(`${url}/api/${path}/cart/${id}`,{
        data:{
          product_id,
          qty:Number(qty)
        }
      })
      if (coupon.success === true){
        handleCoupon();
      } else {
        dispatch(asyncGetCart())
      }
    } catch (error) {
      console.log(error);
    }
  }  

  //刪除購物車單一產品
  const deleteCartItem = async(id) => {
    try {
      await axios.delete(`${url}/api/${path}/cart/${id}`)
      if (coupon.success === true){
        handleCoupon();
      } else {
        dispatch(asyncGetCart())
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [couponCode, setCouponCode] = useState('')
  const [coupon, setCoupon] =useState([])

  const handleCoupon = async() => {
    const data = {
      data:{
        code:couponCode
      }
    }
    try {
      const res = await axios.post(`${url}/api/${path}/coupon`, data)
      setCoupon(res.data)
      dispatch(asyncGetCart())
    } catch (error) {
      console.log(error);
    }
  }

  return(<>
    <div className="container">
      <div className="mt-3">
        <div className="mb-5">
          <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-center w-100 mt-md-0 mt-4">
            <li className="me-md-6 me-3 position-relative custom-step-line">
              <i className="bi bi-check-circle-fill d-md-inline d-block text-center me-1"></i>
              <span className="text-nowrap">確認購物車</span>
            </li>
            <li className="me-md-6 me-3 position-relative custom-step-line">
              <i className="bi bi-check-circle d-md-inline d-block text-center me-1"></i>
              <span className="text-nowrap">填寫資料</span>
            </li>
            <li><i className="bi bi-check-circle d-md-inline d-block text-center me-1"></i>
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
                          <th scope="row" className="border-0 px-0 font-weight-normal py-4">
                            <img src={cartItem.product.imageUrl} alt="imageUrl" style={{width: "72px", height: "72px", objectFit: "cover"}}/>
                            <Link to={`/product/${cartItem.product.id}`}><p className="text-dark mb-0 fw-bold ms-3 d-inline-block">{cartItem.product.title}</p></Link>
                          </th>
                          <td className="border-0 text-center align-middle" style={{maxWidth: "160px"}}>
                            <div>
                              <button className={`btn btn-outline-dark border-0 py-2 ${cartItem.qty === 1 && 'disabled'}`} type="button" id="button-addon1"
                              onClick={() => editCartItem(cartItem.id, cartItem.product.id, cartItem.qty - 1)}>
                                <i className="bi bi-dash-lg"></i>
                              </button>
                              <span className="border-0 text-center px-4 my-auto shadow-none">{cartItem.qty}</span>
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
                              <i className="bi bi-x-lg"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div className="input-group w-50 mb-3">
                  <input type="text" className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none disabled" placeholder="請輸入折扣碼" aria-label="Recipient's username" aria-describedby="button-addon2"
                  value={couponCode} onChange={(e) => setCouponCode(e.target.value)} {...coupon === true && 'disabled'}/>
                  <div className="input-group-append">
                    <button className={`btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0 ${coupon.success === true && 'disabled'}`} type="button" id="button-addon2" onClick={() => handleCoupon()} ><i className="bi bi-send-fill"></i></button>
                  </div>
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
                        <td className="text-end border-0 px-0 pt-0 pb-4">{coupon.success === true ? `-NT$${cartData.total - Math.round(cartData.final_total)}` : '0'}</td>
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
  </>)
}

export default Cart