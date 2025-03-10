import axios from "axios";
import { useForm } from "react-hook-form";

const url = import.meta.env.VITE_BASE_URL; 
const path = import.meta.env.VITE_API_PATH; 
function AdminCoupon () {

  const {
    register,
    handleSubmit,
    formState : {errors}
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
    addCoupon(couponData)
  }

  const addCoupon = async(data) => {
    try {
      await axios.post(`${url}/api/${path}/admin/coupon`, data)
      console.log("新增優惠券成功");
      
    } catch (error) {
      console.log(error);
    }
  }

  return(<>
    <div>
      <div className="container">
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="CouponCode" className="text-muted mb-0 form-label"><span className="text-danger">*</span>優惠券編號</label>
            <input type="text" className={`form-control rounded-0 ${errors.code && "is-invalid"}`} id="CouponCode" placeholder="請輸入優惠券編號"
            {...register("code", {
              required:{
                value:true,
                message:"請輸入優惠券編號"
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
                messge:"折扣不高於原價"
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
          <button type="submit" className="btn btn-primary">新增優惠券</button>
        </form>
      </div>
    </div>
  </>)
}

export default AdminCoupon