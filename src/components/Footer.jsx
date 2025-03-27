import logoWhite from "../assets/images/logo_white.png";
import { Link } from "react-router";

function Footer (){
  return (<>
    <div className="bg-dark pt-3 pt-sm-5 pb-4">
      <div className="container">
        <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-center justify-content-sm-between text-white mb-3 mb-sm-4">
          <div className="d-flex flex-column align-items-center align-items-sm-start">
            <Link className="text-white h4 d-block mb-4" to="/"><img src={logoWhite} alt="logo" width="160px"/></Link>
            <div className="d-flex mb-md-0 mb-2">
              <i className="bi bi-telephone-fill me-2"></i>
              <a href="#" className="text-white text-decoration-none mb-0">04-3456-7890</a>
            </div>
            <div className="d-flex mb-md-0">
              <i className="bi bi-envelope-fill me-2"></i>
              <a href="#" className="text-white text-decoration-none mb-0">black.heart@mail.com</a>
            </div>
          </div>
          <ul className="d-flex list-unstyled mt-2 mt-md-0 h4">
            <li><a href="https://facebook.com" className="text-white"><i className="bi bi-facebook"></i></a></li>
            <li><a href="https://instagram.com" className="text-white ms-4"><i className="bi bi-instagram"></i></a></li>
            <li><a href="https://www.line.me/tw/" className="text-white ms-4"><i className="bi bi-line"></i></a></li>
          </ul>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center text-white border-top pt-3">
          <p className="me-3">© 2025 僅作為作品無任何商業使用</p>
          <Link className="text-white text-decoration-none fs-7" to="/login"><i className="bi bi-gear-fill fs-7"></i>登入後台</Link>
        </div>
      </div>
    </div>  
  </>)
}

export default Footer