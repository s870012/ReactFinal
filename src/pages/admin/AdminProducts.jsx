import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Pagination from "../../components/Pagination";

const url = import.meta.env.VITE_BASE_URL; 
const path = import.meta.env.VITE_API_PATH; 
function AdminProducts (){
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({})

  const getProducts = async(page=1) => {
    try {
      const res = await axios.get(`${url}/api/${path}/admin/products?page=${page}`)
      setProducts(res.data.products)
      setPagination(res.data.pagination)
    } catch (error) {
      console.log(error);
    }
  }

  const checkLogin = async() => {
    try {
      await axios.post(`${url}/api/user/check`)
      getProducts();
    } catch (error) {
      console.dir(error);
      navigate('/')
    }
  }

  useEffect(()=>{
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1",
    );
    axios.defaults.headers.common['Authorization'] = `${token}`;
    checkLogin();
  },[])


  return(<>
    <div>
      <div className="container">
        <div className="text-start mt-4">
          <button type="button" className="btn btn-primary me-3" >建立新的產品</button>
        </div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>圖片</th>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product)=>{
              return (<tr key={product.id}>
                <td><img src={product.imageUrl} alt="imageUrl" className="object-fit-cover" style={{height:"40px"}}/></td>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td className="text-start">{product.origin_price}</td>
                <td className="text-start">{product.price}</td>
                <td>
                  {product.is_enabled ? (<span className="text-success">啟用</span>) : (<span className="text-danger">未啟用</span>)}
                </td>
                <td>
                  <div className="btn-group">
                    <button type="button" className="btn btn-outline-primary btn-sm" >
                      編輯
                    </button>
                    <button type="button" className="btn btn-outline-danger btn-sm" >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
        <Pagination pagination={pagination} getProducts={getProducts} products={products}/>
      </div>
    </div>
  </>)
}

export default AdminProducts