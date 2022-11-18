import React from 'react';
import ReactDOM from 'react-dom/client';
import Register from './components/register';
import MainPage from './components/main-page';
import Stats from './components/stats-page';
import Profile from './components/profile';
import SocketMain from './socket-components/socketMain';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChoicePage from './socket-components/choicePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/stats',
        element: <Stats />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      // TODO add login route
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/race',
        element: <ChoicePage />,
      },
      {
        path: '/socket/:id',
        element: <SocketMain />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // TODO React.StrictMode ??
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();