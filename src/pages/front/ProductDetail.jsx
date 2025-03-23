import axios from "axios"

//swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import 'swiper/css'

import { useEffect, useRef, useState } from "react"
import { useParams, Link } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { asyncGetProducts } from "../../slices/productsSlice"
import { asyncGetCart } from "../../slices/cartSlice"
import { createMessage } from "../../slices/messageSlice"
import Loading from "../../components/Loading"
import MessageToast from "../../components/MessageToast"

const url = import.meta.env.VITE_BASE_URL
const path = import.meta.env.VITE_API_PATH
function ProductDetail (){
  const { id } = useParams()
  const [product, setProduct] = useState({});
  const [cartQty, setCartQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const products = useSelector(state => state.products.data)
  const dispatch = useDispatch()

  useEffect(() => {
    (async() => {
      try {
        const res = await axios.get(`${url}/api/${path}/product/${id}`)
        setProduct(res.data.product)
        dispatch(asyncGetProducts())
      } catch (error) {
        console.log(error)
      }
    })()
  }, [id,dispatch])

  //新增購物車品項
  const addCartItem = async (product_id, qty) => {
    setIsLoading(true)
    try {
      await axios.post(`${url}/api/${path}/cart`, {
        data:{
          product_id,
          qty:Number(qty)
        }
      })
      dispatch(asyncGetCart())
      dispatch(createMessage({
        text:"已新增至購物車",
        status:"success"
      }))
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  //swiper
  const swiperRef = useRef(null)

  const handlePrev = () => {
    if (swiperRef.current.isBeginning) {
      swiperRef.current.slideTo(swiperRef.current.slides.length - 1)
    } else {
      swiperRef.current.slidePrev();
    }
  }

  const handleNext = () => {
    if (swiperRef.current.isEnd) {
      swiperRef.current.slideTo(0)
    } else {
      swiperRef.current.slideNext();
    }
  }

  return(<>
    <Loading isLoading={isLoading} />
    <MessageToast />
    <div className="bg-white100">
      <div className="container pt-62">
        <div className="row align-items-center">
          <div className="col-md-7">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
            >
              {product.imagesUrl?.map((item, index) => {
                return(
                  <SwiperSlide key={index}>
                    <div className="position-relative">
                      <img src={item} alt="itemsImg" style={{height:"400px", width:"100%",objectFit:"cover"}}/>
                      <p type="button" className="position-absolute end-0 top-50 translate-middle-Y text-white fs-5"
                      onClick={handleNext}>Next<i className="bi bi-chevron-right"></i></p>
                      <p type="button" className="position-absolute start-0 top-50 translate-middle-Y text-white fs-5"
                      onClick={handlePrev}><i className="bi bi-chevron-left"></i>Pre</p>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
          <div className="col-md-5">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb px-0 mb-0 py-3">
                <li className="breadcrumb-item"><Link className="text-muted hover-base100" to="/">首頁</Link></li>
                <li className="breadcrumb-item"><Link className="text-muted hover-base100" to="/products">手感烘焙</Link></li>
                <li className="breadcrumb-item active" aria-current="page">介紹</li>
              </ol>
            </nav>
            <h2 className="fw-bold h1 mb-1">{product.title}</h2>
            <p className="mb-0 text-muted text-end"><del>NT${product.origin_price}</del></p>
            <p className="h4 fw-bold text-end">NT${product.price}</p>
            <div className="row align-items-center">
              <div className="col-6">
                <select id="qtySelect" className="form-select form-select  text-center my-auto shadow-none bg-white"
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
        <h3 className="fw-bold mb-2">其他產品</h3>
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay:3000,
            pauseOnMouseEnter:true
          }}
          slidesPerView={2}
          spaceBetween={30}
          breakpoints={{
            375:{
              slidesPerView:2
            },
            768:{
              slidesPerView:3
            }
          }}
        >
          {products.map((product) => {
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
    </div>
  </>)
}

export default ProductDetail