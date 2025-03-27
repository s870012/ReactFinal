import axios from "axios"
import { NavLink, useNavigate } from "react-router"

const routes = [
  {path: "/admin/products", name: "產品管理"},
  {path: "/admin/orders", name: "訂單管理"},
  {path: "/admin/coupon", name: "優惠券管理"},
  {path: "/admin/articles", name: "活動管理"},
]

const url = import.meta.env.VITE_BASE_URL;
function AdminNavbar(){
  const navigate = useNavigate();

  const handleLogout = async(e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/logout`)
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return(<>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand" href="#">後台管理</div>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            {routes.map((route) => {
              return (
                <li key={route.path} className="nav-item">
                  <NavLink className="nav-link" to={route.path}>{route.name}</NavLink> 
                </li>
              )
            })}
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={handleLogout}>登出</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>)
}

export default AdminNavbar;