import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const protectedPaths = ["/cart", "/user", "/ordersummary"];
// import instamart from 

/**
 * Header
 *  - Logo
 *  - Nav Items
 * Body
 *  - Search
 *  - RestaurantContainer
 *    - RestaurantCard
 *      - Img
 *      - Name of Restaurant, Star Rating, cuisine, delivery time
 * Footer
 *  - Copyright
 *  - Links
 *  - Address
 *  - Contact
 */

function App() {
  const isAuthenticated = useSelector(
    (store) => store.auth.isAuthenticated
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isAuthenticated &&
      protectedPaths.some((path) =>
        location.pathname.startsWith(path)
      )
    ) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, location.pathname]);
  return (
    <div className='app'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
export default App