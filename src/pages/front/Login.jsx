import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";

const url = import.meta.env.VITE_BASE_URL; 
function Login (){
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors},
    reset
  } = useForm();

  const login = async(data)=>{
    try {
      const res = await axios.post(`${url}/admin/signin`, data)
      const {token, expired} = res.data;

      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common['Authorization'] = `${token}`;
      
      navigate('/admin')
      reset();
    } catch (error) {
      console.log(error);
    }
  }
  
  return(<>
    <div className="bg-login pt-120 pb-80">   
      <div className="container">
        <div className="row">
          <div className="d-flex flex-column align-items-center justify-content-center py-120 w-50 mx-auto bg-login-inside">
            <h1 className="h3 mb-3 font-weight-normal text-center text-white100">請先登入</h1>
            <div className="col-6">
              <form id="form" className="form-signin" onSubmit={handleSubmit(login)}>
                <div className="form-floating mb-3">
                  <input type="email" className={`form-control ${errors.username && 'is-invalid'}`} id="username" placeholder="name@example.com"  required autoFocus 
                  {...register ('username', {
                    required:{
                      value:true,
                      message:'請輸入Email'
                    },
                    pattern:{
                      value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message:'Email格式不正確'
                    }
                  })}/>
                  {errors.email && (
                    <div className='text-start text-danger my-2'>{errors?.username?.message}</div>
                  )}
                  <label htmlFor="username">Email address</label>
                </div>
                <div className="form-floating">
                  <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} id="password" placeholder="Password" required 
                  {...register('password', {
                    required:{
                      value:true,
                      message:'請輸入密碼'
                    }
                  })}/>
                  {errors.password && (
                    <div className='text-start text-danger my-2'>{errors?.password?.message}</div>
                  )}
                  <label htmlFor="password">Password</label>
                </div>
                <button className="btn btn-lg btn-white200 w-100 mt-3 fw-bold" type="submit">登入</button>
              </form>
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-white100">&copy; 2025~∞ - Black Heart Bakery</p>
      </div>
    </div>
  </>)
}

export default Login