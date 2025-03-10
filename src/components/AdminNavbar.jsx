import axios from "axios"
import { NavLink, useNavigate } from "react-router"

const url = import.meta.env.VITE_BASE_URL;
function AdminNavbar(){
  const navigate = useNavigate();

  const handleLogout = async(e) => {
    e.preventDefault()
    try {
      await axios.post(`${url}/logout`)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return(<>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <div className="navbar-brand" href="#">後台管理</div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/products">產品管理</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/orders">訂單管理</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/coupon">優惠券管理</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={handleLogout}>登出</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>)
}

export default AdminNavbar