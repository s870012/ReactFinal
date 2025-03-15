import './assets/all.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'

import routes from './routes/index.jsx'
import store from './store.js'

const router = createHashRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ store }>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
