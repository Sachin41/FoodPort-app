import { StrictMode, lazy, Suspense } from 'react'
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Error from './components/Error'
import Contact from './components/Contact'
import RestaurantMenu from './components/RestaurantMenu'
import Login from './components/Login'
import User from './components/User'
import OrderSummary from './components/OrderSummary'
import Shimmer from './components/shimmer'
import Signup from './components/Signup'
import { Provider } from 'react-redux';
import appStore from './store/appStore'
// import Cart from './components/Cart'
import { requireAuth } from './utils/authGuard.js'
const About = lazy(() => import("./components/About"));
const Body = lazy(() => import("./components/Body"));
const Cart = lazy(() => import("./components/Cart"));


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Body />
          </Suspense>
        )
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div className='flex  h-[calc(100vh-250px)]  items-center'><h1 className="text-3xl font-bold">Loading...</h1></div>}>
            <About />
          </Suspense>
        )
      },
      {
        path: "/contact",
        element: <Contact />
      },
      // 🔐 PROTECTED ROUTES GROUP
      {
        path: "/user",
        element: <User />,
        loader: requireAuth,
      },
      {
        path: "/cart",
        element:(
          <Suspense fallback={<div className='flex  h-[calc(100vh-250px)]  items-center'><h1 className="text-3xl font-bold">Loading...</h1></div>}>
            <Cart />
          </Suspense>
        ),
        loader: requireAuth,
      },
      {
        path: "/ordersummary",
        element: <OrderSummary />,
        loader: requireAuth,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
    {/* <App /> */}
  </StrictMode>
)
