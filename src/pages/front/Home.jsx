import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/css';
// import 'swiper/css/autoplay';

import  { useForm } from "react-hook-form";

const url = import.meta.env.VITE_BASE_URL
const path = import.meta.env.VITE_API_PATH
function Home (){
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  
  //取得全部產品
  const getProducts = async() => {
    try {
      const res = await axios.get(`${url}/api/${path}/products/all`)
      setProducts(res.data.products)
    } catch (error) {
      console.log(error);
    }
  }

  //骰選Swiper顯示品項
  const filterProducts = products.filter(product => product.origin_price < 70)  

  useEffect(() => {
    getProducts();
    getArticles();
  },[])
  
  //訂閱電子報
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  }
  
  //取得活動列表
  const getArticles = async() => {
    try {
      const res = await axios.get(`${url}/api/${path}/articles`)
      setArticles(res.data.articles)
    } catch (error) {
      console.log(error);
    }
  }

  return(<>
    <section className="bg-white100">
      <div className="container pt-66 pb-5">
        <div className="row flex-md-row-reverse flex-column">
          <div className="col-md-6">
            <img src="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img-fluid"/>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
            <h2 className="fw-bold text-dark100">每一口，都是對美味的堅持</h2>
            <h5 className="font-weight-normal text-dark200 mt-2">
              用心烘焙，為您帶來的不僅是美味，還有每天的幸福與歡樂<br/>在這裡，幸福是隨手可得的
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-0 mt-4">
                <input type="mail" className={`form-control rounded-0 ${errors.subscribeMail && "is-invalid"}`} placeholder="輸入電子郵件，訂閱最新消息" 
                {...register("subscribeMail", {
                  required:{
                    value:true,
                    message:"請輸入電子信箱"
                  },
                  pattern:{
                    value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message:'電子信箱格式不正確'
                  }
                })}/>
                <div className="input-group-append">
                  <button className="btn btn-dark rounded-0" type="submit" id="search">
                    訂閱
                  </button>
                </div>
              </div>
              {errors.subscribeMail && (
                <div className='text-start text-danger ps-2 my-2'>{errors?.subscribeMail?.message}</div>
              )}
            </form>
          </div>
        </div>
        <div className="row mt-5">
          {articles.map((article) => {
            return(
              <div key={article.id} className="col-md-6 mt-md-4">
                <div className="card border-0 mb-4 shadow position-relative h-100">
                  <img
                    src={article.image}
                    className="card-img-top rounded-0"
                    alt="..."
                  />
                  <div className="card-body px-3 h-100 bg-secondary">
                    <h4 className="fw-bold mb-0 mt-4 text-dark100">{article.title}</h4>
                    <div className="d-flex flex-column flex-md-row justify-content-between mt-3">
                      <p className="card-text text-dark200 lh-lg mb-0 w-75">
                        {article.description}
                      </p>
                      <Link className="mt-auto h-100" to={`/article/${article.id}`}>  
                        <button className="btn btn-dark300 text-white100 rounded-1 text-nowrap">
                          了解更多...
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
    <section className="bg-white200">
      <div className="container">
        <div className="row justify-content-center py-3 py-sm-7">
          <div className="col-md-8 d-flex flex-column flex-sm-row">
            <img src="https://media.istockphoto.com/id/517059150/photo/baker-holding-baguettes-at-the-manufacturing.jpg?s=612x612&w=0&k=20&c=3rtryROS8DEkkvtiD1_z-3O644Tv8-lumUPxGsCfhlw=" alt="chef" className="rounded-circle me-sm-5 mb-2 mb-sm-0 mx-auto d-block" style={{width: '160px', height: '160px', objectFit: 'cover'}}/>
            <div className="d-flex flex-column">
              <p className="h5 fw-bold text-dark100 mb-2">Black Heart</p>
              <p className="h5 text-dark">以一顆對食物的熱愛與敬意，踏入了烘焙的世界。將每一塊麵包都視為藝術品，力求每一口都能帶來溫暖與幸福。</p>
              <p className="mt-auto text-muted">Black Heart — 烘焙師傅</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-white100">
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">熱門商品</h2>
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay:3000,
            pauseOnMouseEnter:true
          }}
          slidesPerView={3}
          loop={true}
          breakpoints={{
            375:{
              slidesPerView:1
            },
            576:{
              slidesPerView:2
            },
            768:{
              slidesPerView:3
            }
          }}
          >
          {filterProducts.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <div className="position-relative text-center swiper-hover overflow-hidden d-block">
                  <img src={product.imagesUrl[1]} alt="slideImg" style={{width: '400px', height: 'auto', objectFit: 'cover'}}/>
                  <div className="d-none home-swiper-position home-swiper-hover">
                    <h4 className="my-1 text-white100">{product.title} </h4>
                    <Link to={`/product/${product.id}`} type="button" className="btn btn-lg btn-outline-white100 mt-2">查看更多</Link>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
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