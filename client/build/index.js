"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const register_1 = __importDefault(require("./components/register"));
const main_page_1 = __importDefault(require("./components/main-page"));
const stats_page_1 = __importDefault(require("./components/stats-page"));
const profile_1 = __importDefault(require("./components/profile"));
const socketMain_1 = __importDefault(require("./socket-components/socketMain"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
const react_router_dom_1 = require("react-router-dom");
const choicePage_1 = __importDefault(require("./socket-components/choicePage"));
const login_1 = __importDefault(require("./components/login"));
const react_redux_1 = require("react-redux");
const store_1 = require("./redux/store");
const router = (0, react_router_dom_1.createBrowserRouter)([
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
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(
// <React.StrictMode>
react_1.default.createElement(react_redux_1.Provider, { store: store_1.store },
    react_1.default.createElement(react_router_dom_1.RouterProvider, { router: router }))
// </React.StrictMode>
);
