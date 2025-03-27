import axios from "axios";
import * as bootstrap from 'bootstrap';

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createMessage } from "../../slices/messageSlice";

import { useDispatch } from "react-redux";
import MessageToast from "../../components/MessageToast";
import Loading from "../../components/Loading";
import CouponModal from "../../components/CouponModal";

const url = import.meta.env.VITE_BASE_URL; 
const path = import.meta.env.VITE_API_PATH; 
function AdminCoupon () {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState : {errors},
    reset
  } = useForm();

  const onSubmit = (data) => {
    const couponData = {
      data : {
        ...data,
        is_enabled:Number(1),
        percent:Number(data.percent),
        due_date:Number(new Date(data.due_date))
      }
    }
    addCoupon(couponData);
  }

  //新增憂患券
  const addCoupon = async(data) => {
    setIsLoading(true)
    try {
      await axios.post(`${url}/api/${path}/admin/coupon`, data);
      console.log("新增優惠券成功");
      getCoupons();
      reset();
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  //取得憂患券
  const [couponData, setCouponData] = useState([]);
  const [tempCoupon, setTempCoupon] = useState({
    title:"",
    is_enabled:false,
    percent:0,
    due_date:0,
    code:""
  });
  const getCoupons = async() => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${url}/api/${path}/admin/coupons`);
      setCouponData(res.data.coupons);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1",
    );
    axios.defaults.headers.common['Authorization'] = `${token}`;
    getCoupons();
  },[])

  //刪除優惠券
  const deleteCoupon = async(id) => {
    try {
      const yes = window.confirm("確定刪除?")
      if(yes == true){        
        await axios.delete(`${url}/api/${path}/admin/coupon/${id}`)
        getCoupons();
        setTempCoupon({
          title:"",
          is_enabled:false,
          percent:0,
          due_date:0,
          code:""
        })
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  //編輯Coupon Modal
  const controlModal = useRef(null);
  const editModalRef = useRef(null);
  const openEditModal = async(coupon) => {
    setTempCoupon({
      ...coupon,
      due_date: new Date(coupon.due_date).getFullYear()+'-'+ (new Date(coupon.due_date).getMonth()+1)+'-'+new Date(coupon.due_date).getDate()
    });
    controlModal.current = new bootstrap.Modal(editModalRef.current);
    controlModal.current.show();
  }

  const closeModal=()=>{
    controlModal.current.hide();
  }

  //編輯優惠券
  const handleCouponInput = (e) => {    
    const {id, value, type, checked} = e.target
    setTempCoupon({
      ...tempCoupon,
      [id]:type == 'checkbox' ? checked : value
    });
  }

  const editCoupon = async (id) => {
    const couponData = {
      data : {
        ...tempCoupon,
        is_enabled:tempCoupon.is_enabled? 1 : 0,
        percent:Number(tempCoupon.percent),
        due_date:Number(new Date(tempCoupon.due_date))
      }
    }
    try {
      await axios.put(`${url}/api/${path}/admin/coupon/${id}`, couponData);
      dispatch(createMessage({
        text:"編輯成功",
        status:"success"
      }));
      closeModal();
      getCoupons();
      setTempCoupon({
        title:"",
        is_enabled:false,
        percent:0,
        due_date:0,
        code:""
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return(<>
    <Loading isLoading={isLoading} />
    <MessageToast />
    <CouponModal 
      tempCoupon={tempCoupon}
      editCoupon={editCoupon} 
      editModalRef={editModalRef} 
      handleCouponInput={handleCouponInput} 
      closeModal={closeModal}
    />
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto border py-3 my-3">
            <h4 className="fw-bold mt-4 mb-3">優惠券管理</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="CouponCode" className="text-muted mb-0 form-label"><span className="text-danger">*</span>優惠券碼</label>
                <input type="text" className={`form-control rounded-0 ${errors.code && "is-invalid"}`} id="CouponCode" placeholder="請輸入優惠券編號"
                {...register("code", {
                  required:{
                    value:true,
                    message:"請輸入優惠券碼"
                  }
                })}/>
                {errors.code&& (
                  <div className="text-start text-danger my-2">{errors?.code?.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="CouponTitle" className="text-muted mb-0 form-label"><span className="text-danger">*</span>優惠券名稱</label>
                <input type="text" className={`form-control rounded-0 ${errors.title && "is-invalid"}`} id="CouponTitle" placeholder="請輸入優惠券名稱"
                {...register("title", {
                  required:{
                    value:true,
                    message:"請輸入優惠券名稱"
                  }
                })}/>
                {errors.title&& (
                  <div className="text-start text-danger my-2">{errors?.title?.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="CouponDate" className="text-muted mb-0 form-label"><span className="text-danger">*</span>優惠券期限</label>
                <input type="date" className={`form-control rounded-0 ${errors.due_date && "is-invalid"}`} id="CouponDate" placeholder="請輸入優惠券期限"
                {...register("due_date", {
                  required:{
                    value:true,
                    message:"請輸入優惠券期限"
                  },
                  max:{
                    value:100,
                    message:"折扣不高於原價"
                  },
                  min:{
                    value:10,
                    message:"折扣不能低於1折"
                  }
                })}/>
                {errors.due_date&& (
                  <div className="text-start text-danger my-2">{errors?.due_date?.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="CouponPercent" className="text-muted mb-0 form-label"><span className="text-danger">*</span>優惠券折扣</label>
                <input type="number" className={`form-control rounded-0 ${errors.percent && "is-invalid"}`} id="CouponPercent" placeholder="請輸入優惠券折扣"
                {...register("percent", {
                  required:{
                    value:true,
                    message:"請輸入優惠券折扣"
                  }
                })}/>
                {errors.percent&& (
                  <div className="text-start text-danger my-2">{errors?.percent?.message}</div>
                )}
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-blue">新增優惠券</button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <table className="table mt-4">
            <thead>
              <tr>
                <th>優惠券碼</th>
                <th>優惠券名稱</th>
                <th>優惠券折扣</th>
                <th>優惠券期限</th>
                <th>優惠券狀態</th>
                <th>編輯</th>
              </tr>
            </thead>
            <tbody>
              {couponData.map((coupon) => {
                return(
                  <tr key={coupon.id}>
                    <td>{coupon.code}</td>
                    <td>{coupon.title}</td>
                    <td>{coupon.percent}</td>
                    <td>{new Date(coupon.due_date).getFullYear()+'/'+ (new Date(coupon.due_date).getMonth()+1)+'/'+new Date(coupon.due_date).getDate()}</td>
                    <td className={`${coupon.is_enabled === 1 ? 'text-info' : 'text-danger'}`}>{coupon.is_enabled === 1 ? '啟用中' : '未啟用'}</td>
                    <td>
                      <button className="btn btn-outline-blue" onClick={() => openEditModal(coupon)}>編輯</button>
                      <button className="btn btn-outline-danger" onClick={() => deleteCoupon(coupon.id)}>刪除</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>)
}

export default AdminCoupon;