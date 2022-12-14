"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../css/nav-bar.css");
const react_router_dom_1 = require("react-router-dom");
const APIService_1 = __importDefault(require("../APIService"));
const react_1 = __importDefault(require("react"));
function NavBar({ isAuthenticated, setIsAuthenticated }) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    async function logout() {
        const res = await APIService_1.default.logout();
        if (res.message) {
            localStorage.removeItem('userData');
            setIsAuthenticated(false);
            navigate('/');
        }
    }
    function toRace() {
        navigate('/race');
    }
    const linkTarget = {
        pathname: '/',
        key: Math.random(),
        state: {
            applied: true,
        },
    };
    return (react_1.default.createElement("div", { className: 'navContainer' },
        react_1.default.createElement(react_router_dom_1.Link, { to: linkTarget, className: 'link' }, "aTYPEical"),
        react_1.default.createElement("div", { className: 'wrapper' },
            react_1.default.createElement("div", { className: 'tagline' }, "This is a typing app.")),
        react_1.default.createElement("div", { className: 'buttons' },
            isAuthenticated && (react_1.default.createElement(react_router_dom_1.Link, { to: '/profile', className: 'linkLogin' },
                react_1.default.createElement("button", { className: 'profile' }, "PROFILE"),
                ' ')),
            window.location.href !== 'http://localhost:3000/race' && (react_1.default.createElement("button", { className: 'raceButton', onClick: toRace },
                ' ',
                "RACE",
                ' ')),
            isAuthenticated === false ? (react_1.default.createElement(react_router_dom_1.Link, { to: '/login', className: 'linkLogin' },
                react_1.default.createElement("button", { className: 'logIn' }, "LOGIN"),
                ' ')) : (react_1.default.createElement("button", { className: 'logIn', onClick: logout }, "LOGOUT")))));
}
exports.default = NavBar;
