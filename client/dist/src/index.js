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
var router = createBrowserRouter([
    {
        path: '/',
        element: React.createElement(App, null),
        children: [
            {
                path: '/',
                element: React.createElement(MainPage, null),
            },
            {
                path: '/stats',
                element: React.createElement(Stats, null),
            },
            {
                path: '/register',
                element: React.createElement(Register, null),
            },
            {
                path: '/login',
                element: React.createElement(Login, null),
            },
            {
                path: '/profile',
                element: React.createElement(Profile, null),
            },
            {
                path: '/race',
                element: React.createElement(ChoicePage, null),
            },
            {
                path: '/socket/:id',
                element: React.createElement(SocketMain, null),
            },
        ],
    },
]);
var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
// TODO React.StrictMode ??
// <React.StrictMode>
React.createElement(RouterProvider, { router: router })
// </React.StrictMode>
);
