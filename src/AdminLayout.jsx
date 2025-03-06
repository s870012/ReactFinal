import { NavLink, Outlet } from "react-router"


function AdminLayout () {
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
              <NavLink className="nav-link" to="/admin/order">訂單管理</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">登出</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Outlet />
  </>)
}

export default AdminLayout