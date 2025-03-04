import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router";

import { asyncDeleteCart, asyncGetCart } from "../../slices/cartSlice";
import Search from "../../components/Search"
import { useEffect } from "react";

function Cart() {
  const cartData = useSelector(state => state.cart.data);
  const dispatch = useDispatch();
  
  useEffect(() => {
    (async() => {
      dispatch(asyncGetCart())
    })()
  },[])
  
  const deleteCart = () => {
    dispatch(asyncDeleteCart())
  }

  return(<>
    <div className="container">
      <div className="mt-3">
        <h3 className="fw-bold mt-3 mb-4">您的購物車</h3>
        <div className="row">
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="border-0 ps-0">產品名稱</th>
                  <th scope="col" className="border-0">數量</th>
                  <th scope="col" className="border-0">價格</th>
                  <th scope="col" className="border-0"></th>
                </tr>
              </thead>
              <tbody>
                {cartData.carts?.map((cartItem) => {
                  return(
                    <tr key={cartItem.id} className="border-bottom border-top">
                      <th scope="row" className="border-0 px-0 font-weight-normal py-4">
                        <img src={cartItem.product.imageUrl} alt="imageUrl" style={{width: "72px", height: "72px", objectFit: "cover"}}/>
                        <Link to={`/product/${cartItem.product.id}`}><p className="text-dark mb-0 fw-bold ms-3 d-inline-block">{cartItem.product.title}</p></Link>
                      </th>
                      <td className="border-0 align-middle" style={{maxWidth: "160px"}}>
                        <div className="input-group pe-5">
                          <div className="input-group-prepend">
                            <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1">
                              <i className="bi bi-dash-lg"></i>
                            </button>
                          </div>
                          <input type="text" className="form-control border-0 text-center my-auto shadow-none" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value="1"/>
                          <div className="input-group-append">
                            <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2">
                              <i className="bi bi-plus-lg"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="border-0 align-middle">
                        <p className="mb-0 ms-auto"><del>NT${cartItem.product.origin_price}</del></p>
                        <p className="mb-0 ms-auto">NT${cartItem.product.price}</p>
                      </td>
                      <td className="border-0 align-middle">
                        <button type="button" className="btn btn-outline-danger border-0">
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="input-group w-50 mb-3">
              <input type="text" className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none" placeholder="Coupon Code" aria-label="Recipient's username" aria-describedby="button-addon2"/>
              <div className="input-group-append">
                <button className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0" type="button" id="button-addon2"><i className="bi bi-send"></i></button>
              </div>
            </div>
            <div className="text-end mb-3">
              <button type="button" className="btn btn-danger" onClick={deleteCart}>刪除購物車</button>
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
                    <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">付款方式</th>
                    <td className="text-end border-0 px-0 pt-0 pb-4">ApplePay</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">總價</p>
                <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
              </div>
              <a href="./checkout.html"className="btn btn-dark w-100 mt-4">下一步</a>
            </div>
          </div>
        </div>  
      </div>
    </div>
    <Search/>
  </>)
}

export default Cart