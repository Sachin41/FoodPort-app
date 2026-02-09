import { StrictMode, lazy, Suspense } from 'react'
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Error from './components/Error.jsx'
import Contact from './components/Contact.jsx'
import RestaurantMenu from './components/RestaurantMenu.jsx'
import Login from './components/login.jsx'
import User from './components/User.jsx'
import OrderSummary from './components/OrderSummary.jsx'
import Shimmer from './components/shimmer.jsx'
import Signup from './components/Signup.jsx'
import { Provider } from 'react-redux';
import appStore from './store/appStore'
// import Cart from './components/Cart.jsx'
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
        // loader: requireAuth,
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
