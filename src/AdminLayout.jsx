import axios from "axios";
import Aos from "aos";
import 'aos/dist/aos.css';

import { Outlet, useNavigate } from "react-router"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createMessage } from "./slices/messageSlice";
import AdminNavbar from "./components/AdminNavbar";
import MessageToast from "./components/MessageToast";

const url = import.meta.env.VITE_BASE_URL;
function AdminLayout () {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const checkLogin = async() => {
    try {
      await axios.post(`${url}/api/user/check`)
      dispatch(createMessage({
        text:'登入成功',
        status:'success'
      }))
    } catch (error) {
      console.log(error);
      dispatch(createMessage({
        text:'登入失敗',
        status:'false'
      }))
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
    Aos.init();
  },[])

  return(<>
    <AdminNavbar />
    <Outlet />
    <MessageToast />
  </>)
}

export default AdminLayout