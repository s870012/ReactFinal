import logoWhite from "../assets/images/logo_white.png"
import { Link } from "react-router"

function Footer (){
  return (<>
    <div className="bg-dark py-5">
      <div className="container">
        <div className="d-flex align-items-start justify-content-between text-white mb-md-7 mb-4">
          <div className="d-flex">
            <Link className="text-white h4 me-3" to="/"><img src={logoWhite} alt="logo" width="160px"/></Link>
            <ul>
              <li className="mb-2 list-unstyled">關於我們</li>
              <li className="mb-2 list-unstyled">最新消息</li>
              <Link className="text-white text-decoration-none" to="/login">登入後台</Link>
            </ul>
          </div>
          <ul className="d-flex list-unstyled mb-0 h4">
            <li><a href="#" className="text-white mx-3"><i className="bi bi-facebook"></i></a></li>
            <li><a href="#" className="text-white mx-3"><i className="bi bi-instagram"></i></a></li>
            <li><a href="#" className="text-white ms-3"><i className="bi bi-line"></i></a></li>
          </ul>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
          <div className="mb-md-0 mb-1">
            <p className="mb-0">04-3456-7890</p>
            <p className="mb-0">service@mail.com</p>
          </div>
          <p className="mb-0">© 2025 僅作為作品無任何商業使用</p>
        </div>
      </div>
    </div>  
  </>)
}

export default Footer