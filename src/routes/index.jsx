import Layout from "../Layout"
import Home from "../pages/front/Home"
import Products from "../pages/front/Products"
import ProductDetail from "../pages/front/ProductDetail"
import Cart from "../pages/front/Cart"
import Checkout from "../pages/front/Checkout"
import CheckoutSuccess from "../pages/front/CheckoutSuccess"

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
    ]
  },
  {
    path:'success',
    element:<CheckoutSuccess />
  }
]

export default routes