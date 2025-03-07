import Layout from "../Layout"
import Home from "../pages/front/Home"
import Products from "../pages/front/Products"
import ProductDetail from "../pages/front/ProductDetail"
import Cart from "../pages/front/Cart"
import Checkout from "../pages/front/Checkout"
import CheckoutSuccess from "../pages/front/CheckoutSuccess"
import Login from "../pages/front/Login.jsx"

import AdminLayout from "../AdminLayout"
import AdminOrders from "../pages/admin/AdminOrders"
import AdminProducts from "../pages/admin/AdminProducts"

import NotFound from "../pages/NotFound.jsx"

const routes=[
  {
    path:'/',
    element: <Layout/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'products',
        element:<Products/>,
      },
      {
        path:'product/:id',
        element:<ProductDetail/>
      },
      {
        path:'cart',
        element:<Cart/>
      },
      {
        path:'cart/checkout',
        element:<Checkout/>
      },
      {
        path:'login',
        element:<Login />
      }
    ]
  },
  {
    path:'success',
    element:<CheckoutSuccess/>
  },
  {
    path:'admin',
    element:<AdminLayout/>,
    children:[
      {
        path:'products',
        element:<AdminProducts/>
      },
      {
        path:'orders',
        element:<AdminOrders/>
      }
    ]
  },
  {
    path:'*',
    element:<NotFound/>
  }
]

export default routes