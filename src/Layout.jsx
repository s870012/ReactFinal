import { Outlet } from "react-router"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"

function Layout (){
  return (<>
    <Navbar/>
      <ScrollToTop/>
      <Outlet/>
    <Footer/>
  </>)
}

export default Layout