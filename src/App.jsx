import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './store/appStore'

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
  return (
    <Provider store={appStore}>
    <div className='app'>
      <Header />
      <Outlet />
      <Footer />
    </div>
    </Provider>
  )
}
export default App



