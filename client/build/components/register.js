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
require("../css/register-login.css");
const react_1 = __importStar(require("react"));
const index_1 = __importDefault(require("../APIService/index"));
const react_router_dom_1 = require("react-router-dom");
function Register() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    // TODO context or Redux
    const [registerEmail, setRegisterEmail] = (0, react_1.useState)('');
    const [registerUsername, setRegisterUsername] = (0, react_1.useState)('');
    const [registerPassword, setRegisterPassword] = (0, react_1.useState)('');
    const { setIsAuthenticated } = (0, react_router_dom_1.useOutletContext)();
    const [alertMessage] = (0, react_1.useState)('your Email sucks ass btw');
    (0, react_1.useEffect)(() => {
        if (localStorage.getItem('userData') !== null)
            navigate('/profile');
    }, []);
    const register = async () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regex.test(registerEmail) === false) {
            setRegisterEmail((registerEmail) => (registerEmail = ''));
            setRegisterUsername('');
            setRegisterPassword('');
            alert(alertMessage);
            return;
        }
        const user = {
            email: registerEmail,
            username: registerUsername,
            password: registerPassword,
        };
        const res = await index_1.default.register(user);
        if (res.error) {
            alert('user already exists');
        }
        else {
            setRegisterEmail('');
            setRegisterPassword('');
            setRegisterEmail('');
            setIsAuthenticated(true);
            navigate('/profile');
        }
    };
    return (react_1.default.createElement("div", { className: 'forms-container' },
        react_1.default.createElement("div", { className: 'register' },
            react_1.default.createElement("h1", { className: 'formTitle' }, "Register"),
            react_1.default.createElement("input", { id: 'email', placeholder: 'email', value: registerEmail, onChange: (e) => setRegisterEmail(e.target.value) }),
            react_1.default.createElement("input", { id: 'username', placeholder: 'username', value: registerUsername, onChange: (e) => setRegisterUsername(e.target.value) }),
            react_1.default.createElement("input", { id: 'password', placeholder: 'password', value: registerPassword, onChange: (e) => setRegisterPassword(e.target.value), onKeyUp: (e) => {
                    if (e.key === 'Enter')
                        register();
                } }),
            react_1.default.createElement("button", { id: 'buttonRegister', onClick: register, className: 'submit' }, "Register"),
            react_1.default.createElement(react_router_dom_1.Link, { to: '/login', reloadDocument: true, className: 'linkLogin' },
                react_1.default.createElement("p", { className: 'have-account-register' }, "Already have an account?"),
                react_1.default.createElement("p", { className: 'login-register-link' }, "Log in")))));
}
exports.default = Register;
