import {
  Outlet
} from 'react-router-dom';

import {
  ToastContainer
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/NavbarComponent/NavbarComponent';
import Footer from './components/FooterComponent/FooterComponent';

import './App.css';

function App() {
  return (
    <div className='class-app'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />

      <Navbar />

      <div className="class-container">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;