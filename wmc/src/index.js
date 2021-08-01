import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalLoadingContextProvider from './Context/GlobalLoadingContext';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalLoadingContextProvider>
      <App />
    </GlobalLoadingContextProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);




reportWebVitals();
