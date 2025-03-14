import { NavLink } from "react-router"
import logo from "../assets/images/logo.png"

function Navbar (){
  return(<>
    <div>
      <div className="container d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-light">
          <NavLink className="navbar-brand" to="/"><img src={logo} alt="logo" style={{height:"40px"}}/></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link me-4 active" to="/">品牌故事</NavLink>
              <NavLink className="nav-item nav-link me-4 active" to="/">最新消息</NavLink>
              <NavLink className="nav-item nav-link me-4" to="/products">商品</NavLink>
              <NavLink className="nav-item nav-link" to="/cart"><i className="bi bi-cart-fill"></i></NavLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </>)
}

export default Navbar