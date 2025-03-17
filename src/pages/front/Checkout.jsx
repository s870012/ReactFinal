import axios from "axios";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { asyncGetCart } from "../../slices/cartSlice";

import Loading from "../../components/Loading";

const url = import.meta.env.VITE_BASE_URL; 
const path = import.meta.env.VITE_API_PATH; 
function Checkout () {
  const cartData = useSelector((state) => state.cart.data)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async() => {
      dispatch(asyncGetCart())
    })()
  }, [ dispatch ])

  const {
    register,
    handleSubmit,
    formState : { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    
    const {payment, message, checked, ...user} = data;
    const orderInfo = {
      data:{
        user,
        message
      }
    }
    handleOrder(orderInfo)
  }

  const handleOrder = async(data) => {
    setIsLoading(true);
    try {
      await axios.post(`${url}/api/${path}/order`, data)
      navigate('/success');
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return(<>
    <Loading isLoading={isLoading} />
     <div className="bg-light pt-120 pb-7">
      <div className="container">
        <div className="mb-5">
          <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-center w-100 mt-md-0 mt-4">
            <li className="me-md-6 me-3 position-relative custom-step-line">
              <i className="bi bi-check-circle-fill d-md-inline d-block text-center me-1"></i>
              <span className="text-nowrap">確認購物車</span>
            </li>
            <li className="me-md-6 me-3 position-relative custom-step-line">
              <i className="bi bi-check-circle-fill d-md-inline d-block text-center me-1"></i>
              <span className="text-nowrap">填寫資料</span>
            </li>
            <li><i className="bi bi-check-circle d-md-inline d-block text-center me-1"></i>
            <span className="text-nowrap">完成訂單</span>
            </li>
          </ul>
        </div>
        <div className="row justify-content-center flex-md-row flex-column-reverse">
          <div className="col-md-6">
          <div className="bg-white p-4">
              <h4 className="fw-bold border-bottom pb-2">付款方式</h4>
              <form>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="信用卡" defaultChecked
                  {...register("payment")}/>
                  <label className="form-check-label text-muted" htmlFor="gridRadios1">信用卡
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="ATM"
                  {...register("payment")}/>
                  <label className="form-check-label text-muted" htmlFor="gridRadios2">ATM轉帳
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="電子支付"
                  {...register("payment")}/>
                  <label className="form-check-label text-muted" htmlFor="gridRadios3">電子支付
                  </label>
                </div>
              </form>
            </div>
            <div className="bg-white p-4 mt-3">
              <h4 className="fw-bold border-bottom pb-2">確認資訊</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="ContactName" className="text-muted mb-0 form-label"><span className="text-danger">*</span>姓名</label>
                  <input type="text" className={`form-control rounded-0 ${errors.name && "is-invalid"}`} id="ContactName" placeholder="請輸入收貨人姓名"
                  {...register("name", {
                    required:{
                      value:true,
                      message:"請輸入姓名"
                    }
                  })}/>
                  {errors.name&& (
                    <div className="text-start text-danger my-2">{errors?.name?.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="ContactPhone" className="text-muted mb-0 form-label"><span className="text-danger">*</span>電話</label>
                  <input type="text" className={`form-control rounded-0 ${errors.tel && "is-invalid"}`} id="ContactPhone" placeholder="請輸入連絡電話"
                  {...register("tel", {
                    required:{
                      value:true,
                      message:"請輸入電話"
                    },
                    pattern:{
                      value:/^(0\d{2,3}-?\d{7,8}|1\d{10})$/,
                      message:'電話格式不正確'
                    }
                  })}/>
                  {errors.tel && (
                    <div className='text-start text-danger my-2'>{errors?.tel?.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="ContactAddress" className="text-muted mb-0 form-label"><span className="text-danger">*</span>地址</label>
                  <input type="text" className={`form-control rounded-0 ${errors.address && "is-invalid"}`} id="ContactAddress" placeholder="請輸入收件地址"
                  {...register("address", {
                    required:{
                      value:true,
                      message:"請輸入地址"
                    }
                  })}/>
                  {errors.address && (
                    <div className='text-start text-danger my-2'>{errors?.address?.message}</div>
                  )}
                </div>
                <div className="mb-1">
                  <label htmlFor="ContactMail" className="text-muted mb-0 form-label"><span className="text-danger">*</span>Email</label>
                  <input type="email" className={`form-control rounded-0 ${errors.email && "is-invalid"}`} id="ContactMail" aria-describedby="emailHelp" placeholder="請輸入電子信箱"
                  {...register("email", {
                    required:{
                      value:true,
                      message:"請輸入電子信箱"
                    },
                    pattern:{
                      value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message:'電子信箱格式不正確'
                    }
                  })}/>
                  {errors.email && (
                    <div className='text-start text-danger my-2'>{errors?.email?.message}</div>
                  )}
                </div>
                <div className="form-group form-check mb-3">
                  <input type="checkbox" className="form-check-input rounded-0" id="ContactLorem"
                  {...register("checked")}/>
                  <label className="form-check-label fs-7" htmlFor="ContactLorem">訂閱Black Heart Bakery電子報，第一時間收到更多優惠資訊</label>
                </div>
                <div>
                  <label htmlFor="message" className="form-label">意見回饋</label>
                  <textarea id="message" className="form-control" cols="30" rows="5"
                  {...register('message')}></textarea>
                </div>
                <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                  <Link className="text-dark mt-md-0 mt-3 text-decoration-none" to="/cart"><i className="bi bi-chevron-left me-2"></i> 回上一頁</Link>
                  <button type="submit" className="btn btn-dark py-3 px-7 rounded-0">送出訂單</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white border p-4 mb-4">
              <h4 className="mb-4">訂單明細</h4>
              {cartData?.carts?.map((cartItem) => {
                return(
                  <div key={cartItem.id} className="d-flex mt-2">
                    <img src={cartItem.product.imageUrl} alt="" className="me-2" style={{width: "48px", height: "48px", objectFit: "cover"}}/>
                    <div className="w-100">
                      <div className="d-flex justify-content-between fw-bold">
                        <p className="mb-0">{cartItem.product.title}</p>
                        <p className="mb-0">x{cartItem.qty}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0"><small>NT${cartItem.product.price}</small></p>
                        <p className="mb-0">NT${cartItem.product.price * cartItem.qty}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
              <table className="table mt-4 border-top border-bottom text-muted">
                <tbody>
                  <tr>
                    <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">小計</th>
                    <td className="text-end border-0 px-0 pt-4">NT${cartData.total}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">Payment</th>
                    <td className="text-end border-0 px-0 pt-0 pb-4">ApplePay</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">總價</p>
                <p className="mb-0 h4 fw-bold">NT${Math.round(cartData.final_total)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Checkout