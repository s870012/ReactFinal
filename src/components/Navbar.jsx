import { NavLink } from "react-router"
import logo from "../assets/images/logo.png"

import { asyncGetCart } from "../slices/cartSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

const routes = [
  {path: "/story", name: "品牌故事"},
  {path: "/news", name: "最新消息"},
  {path: "/products", name: "商品"},
  {path: "/cart", name: "購物車"},
]

function Navbar (){
  const dispatch = useDispatch();
  const carts = useSelector(state => state.cart.data)

  useEffect(() => {
    (async() => {
      dispatch(asyncGetCart())
    })()
  }, [dispatch])
  
  const cartsQty = carts?.carts?.map((cart) => cart.qty).reduce((a, b) => a + b)
  
  return(<>
    <div>
      <div className="container d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-light">
          <NavLink className="navbar-brand" to="/"><img src={logo} alt="logo" style={{height:"40px"}}/></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav d-flex align-items-center">
              {routes.map((route) => {
                return (
                  <NavLink key={route.path} className="nav-item nav-link me-4 active" to={route.path}>
                    {route.name === "購物車" ? (
                      <div className="position-relative">
                        <i className="bi bi-cart-fill fs-5"></i>
                        <span
                          className="position-absolute badge text-bg-danger rounded-circle fs-7"
                          style={{
                            bottom: "12px",
                            left: "12px",
                          }}
                        >{cartsQty}</span>
                      </div>
                    ) : (
                      route.name
                    )}
                  </NavLink>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  </>)
}

export default Navbar