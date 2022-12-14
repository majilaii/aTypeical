"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../css/register-login.css");
var react_1 = __importStar(require("react"));
var index_1 = __importDefault(require("../APIService/index"));
var react_router_dom_1 = require("react-router-dom");
function Register() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    // TODO context or Redux
    var _a = (0, react_1.useState)(''), registerEmail = _a[0], setRegisterEmail = _a[1];
    var _b = (0, react_1.useState)(''), registerUsername = _b[0], setRegisterUsername = _b[1];
    var _c = (0, react_1.useState)(''), registerPassword = _c[0], setRegisterPassword = _c[1];
    var setIsAuthenticated = (0, react_router_dom_1.useOutletContext)().setIsAuthenticated;
    var alertMessage = (0, react_1.useState)('your Email sucks ass btw')[0];
    (0, react_1.useEffect)(function () {
        if (localStorage.getItem('userData') !== null)
            navigate('/profile');
    }, []);
    var register = function () { return __awaiter(_this, void 0, void 0, function () {
        var regex, user, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    if (regex.test(registerEmail) === false) {
                        setRegisterEmail(function (registerEmail) { return (registerEmail = ''); });
                        setRegisterUsername('');
                        setRegisterPassword('');
                        alert(alertMessage);
                        return [2 /*return*/];
                    }
                    user = {
                        email: registerEmail,
                        username: registerUsername,
                        password: registerPassword,
                    };
                    return [4 /*yield*/, index_1.default.register(user)];
                case 1:
                    res = _a.sent();
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
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", { className: 'forms-container' }, react_1.default.createElement("div", { className: 'register' }, react_1.default.createElement("h1", { className: 'formTitle' }, "Register"), react_1.default.createElement("input", { id: 'email', placeholder: 'email', value: registerEmail, onChange: function (e) { return setRegisterEmail(e.target.value); } }), react_1.default.createElement("input", { id: 'username', placeholder: 'username', value: registerUsername, onChange: function (e) { return setRegisterUsername(e.target.value); } }), react_1.default.createElement("input", { id: 'password', placeholder: 'password', value: registerPassword, onChange: function (e) { return setRegisterPassword(e.target.value); }, onKeyUp: function (e) {
            if (e.key === 'Enter')
                register();
        } }), react_1.default.createElement("button", { id: 'buttonRegister', onClick: register, className: 'submit' }, "Register"), react_1.default.createElement(react_router_dom_1.Link, { to: '/login', reloadDocument: true, className: 'linkLogin' }, react_1.default.createElement("p", { className: 'have-account-register' }, "Already have an account?"), react_1.default.createElement("p", { className: 'login-register-link' }, "Log in")))));
}
exports.default = Register;
