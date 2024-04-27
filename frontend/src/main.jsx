import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom';

import Home from './routes/HomeRoute/HomeRoute.jsx';
import AddMemory from './routes/AddMemoryRoute/AddMemoryRoute.jsx';
import Memory from './routes/MemoryRoute/MemoryRoute.jsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/add-memory',
          element: <AddMemory />
        },
        {
          path: '/memories/:id',
          element: <Memory />
        }
      ]
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);