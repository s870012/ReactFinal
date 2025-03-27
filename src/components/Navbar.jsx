import { NavLink } from "react-router";

import { asyncGetCart } from "../slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"

const routes = [
  {path: "/about", name: "品牌故事"},
  {path: "/articles", name: "活動訊息"},
  {path: "/products", name: "手感烘焙"},
  {path: "/cart", name: "購物車"},
]

function Navbar (){
  const dispatch = useDispatch();
  const carts = useSelector(state => state.cart.data);

  useEffect(() => {
    (async() => {
      dispatch(asyncGetCart());
    })()
  }, [dispatch])
  
  // const cartsQty = carts?.carts?.map((cart) => cart.qty).reduce((a, b) => a + b)
  
  return(<>
    <div className="position-fixed w-100 bg-primary" style={{zIndex:"1000"}}>
      <div className="container d-flex flex-column justify-content-center">
        <nav className="navbar navbar-expand-md">
          <h1 className="navbar-brand p-0 me-0"><NavLink className="logo-mark" to="/">black heart</NavLink></h1>
          <div className="d-flex align-items-center">
            <NavLink className="d-md-none me-4" to="/cart">
              <div className="position-relative">
                <i className="bi bi-cart-fill fs-5 text-dark"></i>
                <span
                  className="position-absolute badge text-bg-danger rounded-circle fs-7"
                  style={{
                    bottom: "12px",
                    left: "12px",
                  }}
                >{carts?.carts?.length}</span>
              </div>
            </NavLink> 
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav d-flex align-items-center">
              {routes.map((route) => {
                return (
                  <NavLink key={route.path} className="nav-item nav-link me-4 active text-dark200" to={route.path}>
                    {route.name === "購物車" ? (
                      <div className="position-relative d-none d-md-block">
                        <i className="bi bi-cart-fill fs-5 hover-base200"></i>
                        <span
                          className="position-absolute badge text-bg-danger rounded-circle fs-7"
                          style={{
                            bottom: "12px",
                            left: "12px",
                          }}
                        >{carts?.carts?.length}</span>
                      </div>
                    ) : (
                      <span className="hover-base200">{route.name}</span>
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

export default Navbar;