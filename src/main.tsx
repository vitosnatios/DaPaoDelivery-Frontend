import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './pages/MainPage.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TestPage from './pages/TestPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/teste',
    element: <TestPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
