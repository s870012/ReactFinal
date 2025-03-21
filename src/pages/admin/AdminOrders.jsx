import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createMessage } from "../../slices/messageSlice";

import Loading from "../../components/Loading";
import MessageToast from "../../components/MessageToast";
// import Pagination from "../../components/Pagination";

const url = import.meta.env.VITE_BASE_URL; 
const path = import.meta.env.VITE_API_PATH; 
function AdminOrders(){
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] =useState(false);
  // const [pagination, setPagination] = useState({})

  const dispatch = useDispatch();

  const getAdminOrders = async() => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${url}/api/${path}/admin/orders`)
      setOrdersData(res.data.orders)
      // setPagination(res.data.pagination)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1",
    );
    axios.defaults.headers.common['Authorization'] = `${token}`;
    getAdminOrders();
  },[])

  //變更訂單狀態
  const handleOrderPaid = async(order_id, order) => {
    console.log(order);
    
    let {is_paid, id, user, total, ...preData} = order
    let {creditNum, expiryDate, cvc, ...preUser} = user
    user = preUser
    if(is_paid === false){
      is_paid = true;
    } else {
      is_paid = false
    }
    const data = {
      data:{
        ...preData,
        user,
        message:"",
        is_paid 
      }
    }
    console.log(data);
    try {
      await axios.put(`${url}/api/${path}/admin/order/${order_id}`, id, data)
    } catch (error) {
      console.dir(error);
    }
  }

  //刪除訂單
  const deleteOrder = async(id) => {
    setIsLoading(true)
    try {
      await axios.delete(`${url}/api/${path}/admin/order/${id}`)
      getAdminOrders();
      dispatch(createMessage({
        text:"刪除訂單成功",
        status:"success"
      }))
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }
  
  return (<>
    <Loading isLoading={isLoading} />
    <MessageToast />
    <div>
      <div className="container">
        <table className="table mt-4">
          <thead>
            <tr className="text-center">
              <th>訂單編號</th>
              <th>聯絡人</th>
              <th>連絡電話</th>
              <th>聯絡地址</th>
              <th>電子信箱</th>
              <th>訂單金額</th>
              <th>訂單狀態</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => {
              return(
                <tr key={order.id} className="text-center align-middle">
                  <td>{order.create_at}</td>
                  <td>{order.user.name}</td>
                  <td>{order.user.tel}</td>
                  <td>{order.user.address}</td>
                  <td>{order.user.email}</td>
                  <td>{order.total}</td>
                  <td className={`hover  ${order.is_paid === true ? 'text-success' : 'text-info'}`} onClick={() => handleOrderPaid(order.id, order)}>
                    {order.is_paid === true ? '已付款' : '未付款'}
                  </td>
                  <td><button type="button" className="btn btn-outline-danger" onClick={() => deleteOrder(order.id)}>刪除</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* <Pagination pagination={pagination} getAdminOrders={getAdminOrders} ordersData={ordersData}/> */}
      </div>
    </div>
  </>)
}

export default AdminOrders