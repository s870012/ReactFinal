import { NavLink } from "react-router"

function Navbar (){
  return(<>
    <div>
      <div className="container d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="./index.html">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link me-4 active" to="/">Home</NavLink>
              <NavLink className="nav-item nav-link me-4" to="/products">Product</NavLink>
              <NavLink className="nav-item nav-link" to="/cart">Cart</NavLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </>)
}

export default Navbar