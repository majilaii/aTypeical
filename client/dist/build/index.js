"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
var register_1 = __importDefault(require("./components/register"));
var main_page_1 = __importDefault(require("./components/main-page"));
var stats_page_1 = __importDefault(require("./components/stats-page"));
var profile_1 = __importDefault(require("./components/profile"));
var socketMain_1 = __importDefault(require("./socket-components/socketMain"));
require("./index.css");
var App_1 = __importDefault(require("./App"));
var react_router_dom_1 = require("react-router-dom");
var choicePage_1 = __importDefault(require("./socket-components/choicePage"));
var login_1 = __importDefault(require("./components/login"));
var router = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: '/',
        element: react_1.default.createElement(App_1.default, null),
        children: [
            {
                path: '/',
                element: react_1.default.createElement(main_page_1.default, null),
            },
            {
                path: '/stats',
                element: react_1.default.createElement(stats_page_1.default, null),
            },
            {
                path: '/register',
                element: react_1.default.createElement(register_1.default, null),
            },
            {
                path: '/login',
                element: react_1.default.createElement(login_1.default, null),
            },
            {
                path: '/profile',
                element: react_1.default.createElement(profile_1.default, null),
            },
            {
                path: '/race',
                element: react_1.default.createElement(choicePage_1.default, null),
            },
            {
                path: '/socket/:id',
                element: react_1.default.createElement(socketMain_1.default, null),
            },
        ],
    },
]);
var root = client_1.default.createRoot(document.getElementById('root'));
root.render(
// TODO React.StrictMode ??
// <React.StrictMode>
react_1.default.createElement(react_router_dom_1.RouterProvider, { router: router })
// </React.StrictMode>
);
