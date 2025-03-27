import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { asyncGetOrders } from "../../slices/orderSlice";
import logo from "../../assets/images/logo.png";
import { useEffect } from "react";

function CheckoutSuccess () {
  const ordersData = useSelector(state => state.orders.data);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      dispatch(asyncGetOrders());
    })()
  },[dispatch])

  return (<>
    <div className="position-relative d-flex">
      <div className="container d-flex flex-column" style={{minHeight: "100vh"}}>
        <nav className="navbar navbar-expand-lg navbar-light px-0">
          <Link className="navbar-brand" to="/"><img src={logo} alt="logo" style={{height:"40px"}}/></Link>
        </nav>
        <div className="row my-auto pb-7">
          <div className="col-md-4 d-flex flex-column">
            <div className="my-auto">
              <h2>訂購成功</h2>
              <p>您的訂單編號為 <span className="text-warning">{ordersData.create_at}</span></p>
              <p>感謝您選擇我們的！您的訂單已經成功處理，我們將會盡快為您準備並發送</p>
              <a href="./index.html" className="btn btn-dark mt-4 px-5">返回首頁</a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-md-50 w-100 position-absolute opacity-1" style={{zIndex: "-1", minHeight: "100vh", right: "0", backgroundImage: "url(https://images.unsplash.com/photo-1549488344-cab7d6164423?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGJha2VyeXxlbnwwfHwwfHx8MA%3D%3D)",
      backgroundPosition: "center center", backgroundSize:"cover"}}>
      </div>
    </div>
  </>)
}

export default CheckoutSuccess;