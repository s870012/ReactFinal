import Layout from "../Layout"
import Home from "../pages/front/Home"
import About from "../pages/front/About.jsx"
import Products from "../pages/front/Products"
import ProductDetail from "../pages/front/ProductDetail"
import Articles from "../pages/front/Articles.jsx"
import ArticleDetail from "../pages/front/ArticleDetail.jsx"
import Cart from "../pages/front/Cart"
import Checkout from "../pages/front/Checkout"
import CheckoutSuccess from "../pages/front/CheckoutSuccess"
import Login from "../pages/front/Login.jsx"

import AdminLayout from "../AdminLayout"
import AdminOrders from "../pages/admin/AdminOrders"
import AdminProducts from "../pages/admin/AdminProducts"
import AdminCoupon from "../pages/admin/AdminCoupon.jsx"
import AdminArticles from "../pages/admin/AdminArticles.jsx"

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
        path:'about',
        element: <About/>
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
        path:'articles',
        element:<Articles/>
      },
      {
        path:'article/:id',
        element:<ArticleDetail/>
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
      },
      {
        path:'success',
        element:<CheckoutSuccess/>
      },
    ]
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
      },
      {
        path:'coupon',
        element:<AdminCoupon/>
      },
      {
        path: 'articles',
        element:<AdminArticles/>
      }
    ]
  },
  {
    path:'*',
    element:<NotFound/>
  }
]

export default routes