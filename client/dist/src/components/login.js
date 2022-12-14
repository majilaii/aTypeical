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
// TODO Separate login and register
import '../css/register-login.css';
import React, { useState, useEffect } from 'react';
import APIservice from '../APIService/index';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
export default function Login() {
    var _this = this;
    var navigate = useNavigate();
    // TODO context or Redux
    var _a = useState(''), loginUsername = _a[0], setLoginUsername = _a[1];
    var _b = useState(''), loginPassword = _b[0], setLoginPassword = _b[1];
    var setIsAuthenticated = useOutletContext().setIsAuthenticated;
    useEffect(function () {
        if (localStorage.getItem('userData') !== null)
            navigate('/profile');
    }, []);
    var login = function () { return __awaiter(_this, void 0, void 0, function () {
        var user, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = { username: loginUsername, password: loginPassword };
                    return [4 /*yield*/, APIservice.login(user)];
                case 1:
                    res = _a.sent();
                    if (res.error) {
                        alert("".concat(res.message));
                        setLoginUsername('');
                        setLoginPassword('');
                    }
                    else {
                        setIsAuthenticated(true);
                        localStorage.setItem('userData', JSON.stringify(res));
                        navigate('/profile');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: 'forms-container' },
        React.createElement("div", { className: 'login' },
            React.createElement("h1", { className: 'formTitle' }, "Login"),
            React.createElement("input", { id: 'usernameLogin', placeholder: 'username', value: loginUsername, onChange: function (e) { return setLoginUsername(e.target.value); } }),
            React.createElement("input", { id: 'passwordLogin', placeholder: 'password', value: loginPassword, onChange: function (e) { return setLoginPassword(e.target.value); }, onKeyUp: function (e) {
                    if (e.key === 'Enter')
                        login();
                } }),
            React.createElement("button", { id: 'buttonLogin', onClick: login, className: 'submit' }, "Login"),
            React.createElement(Link, { to: '/register', reloadDocument: true, className: 'linkRegister' },
                React.createElement("p", { className: 'have-account-register' }, "New user?"),
                React.createElement("p", { className: 'login-register-link' }, "Register")))));
}
