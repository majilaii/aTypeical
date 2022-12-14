"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO Separate login and register
require("../css/register-login.css");
const react_1 = __importStar(require("react"));
const index_1 = __importDefault(require("../APIService/index"));
const react_router_dom_1 = require("react-router-dom");
function Login() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    // TODO context or Redux
    const [loginUsername, setLoginUsername] = (0, react_1.useState)('');
    const [loginPassword, setLoginPassword] = (0, react_1.useState)('');
    const { setIsAuthenticated } = (0, react_router_dom_1.useOutletContext)();
    (0, react_1.useEffect)(() => {
        if (localStorage.getItem('userData') !== null)
            navigate('/profile');
    }, []);
    const login = async () => {
        const user = { username: loginUsername, password: loginPassword };
        const res = await index_1.default.login(user);
        if (res.error) {
            alert(`${res.message}`);
            setLoginUsername('');
            setLoginPassword('');
        }
        else {
            setIsAuthenticated(true);
            localStorage.setItem('userData', JSON.stringify(res));
            navigate('/profile');
        }
    };
    return (react_1.default.createElement("div", { className: 'forms-container' },
        react_1.default.createElement("div", { className: 'login' },
            react_1.default.createElement("h1", { className: 'formTitle' }, "Login"),
            react_1.default.createElement("input", { id: 'usernameLogin', placeholder: 'username', value: loginUsername, onChange: (e) => setLoginUsername(e.target.value) }),
            react_1.default.createElement("input", { id: 'passwordLogin', placeholder: 'password', value: loginPassword, onChange: (e) => setLoginPassword(e.target.value), onKeyUp: (e) => {
                    if (e.key === 'Enter')
                        login();
                } }),
            react_1.default.createElement("button", { id: 'buttonLogin', onClick: login, className: 'submit' }, "Login"),
            react_1.default.createElement(react_router_dom_1.Link, { to: '/register', reloadDocument: true, className: 'linkRegister' },
                react_1.default.createElement("p", { className: 'have-account-register' }, "New user?"),
                react_1.default.createElement("p", { className: 'login-register-link' }, "Register")))));
}
exports.default = Login;
