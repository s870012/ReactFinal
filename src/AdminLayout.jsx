import axios from "axios";

import { Outlet, useNavigate } from "react-router"
import { useEffect } from "react";
import AdminNavbar from "./components/AdminNavbar"

const url = import.meta.env.VITE_BASE_URL;
function AdminLayout () {
  const navigate = useNavigate();

  const checkLogin = async() => {
    try {
      await axios.post(`${url}/api/user/check`)
      navigate('/admin/products')
    } catch (error) {
      console.log(error);
      navigate('/')
    }
  }

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common['Authorization'] = `${token}`;
    checkLogin();
  },[])

  return(<>
    <AdminNavbar />
    <Outlet />
  </>)
}

export default AdminLayout