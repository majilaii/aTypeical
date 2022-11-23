import React from 'react';
import ReactDOM from 'react-dom/client';
import Register from './components/register';
import MainPage from './components/main-page';
import Stats from './components/stats-page';
import Profile from './components/profile';
import SocketMain from './socket-components/socketMain';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChoicePage from './socket-components/choicePage';
import Login from './components/login';
import { Provider } from 'react-redux';
import { store } from './redux/store';

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
      {
        path: '/login',
        element: <Login />,
      },
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
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

