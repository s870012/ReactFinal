import Aos from "aos";
import 'aos/dist/aos.css';
import { Outlet } from "react-router"
import { useEffect } from "react"

import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"

function Layout (){
  useEffect(() => {
    Aos.init();
  },[])

  return (<>
    <Navbar/>
      <ScrollToTop/>
      <Outlet/>
    <Footer/>
  </>)
}

export default Layout