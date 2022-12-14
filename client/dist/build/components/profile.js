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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("../css/profile.css");
var react_router_dom_1 = require("react-router-dom");
var APIService_1 = __importDefault(require("../APIService"));
var training_history_1 = __importDefault(require("../profile-components/training-history"));
var react_2 = __importDefault(require("react"));
function Profile() {
    var _this = this;
    // TODO move to context (or Redux)
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(null), username = _a[0], setUsername = _a[1];
    var _b = (0, react_1.useState)([]), history = _b[0], setHistory = _b[1];
    var setIsAuthenticated = (0, react_router_dom_1.useOutletContext)().setIsAuthenticated;
    var _c = (0, react_1.useState)(0), totalTime = _c[0], setTotalTIme = _c[1];
    var _d = (0, react_1.useState)(0), totalLetters = _d[0], setTotalLetters = _d[1];
    var _e = (0, react_1.useState)(0), totalWPM = _e[0], setTotalWPM = _e[1];
    var _f = (0, react_1.useState)(0), totalRawWPM = _f[0], setTotalRawWPM = _f[1];
    var _g = (0, react_1.useState)(0), totalAccuracy = _g[0], setTotalAccuracy = _g[1];
    (0, react_1.useEffect)(function () {
        var getProfile = function () { return __awaiter(_this, void 0, void 0, function () {
            var userInfo, username_1, history_1, counter_1, timeCounter_1, rawWPM_1, wpm_1, accuracy_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, APIService_1.default.profile()];
                    case 1:
                        userInfo = _a.sent();
                        if (userInfo) {
                            username_1 = userInfo.username, history_1 = userInfo.history;
                            setUsername(username_1);
                            setIsAuthenticated(true);
                            setHistory(history_1);
                            counter_1 = 0;
                            timeCounter_1 = 0;
                            rawWPM_1 = 0;
                            wpm_1 = 0;
                            accuracy_1 = 0;
                            if (history_1.length) {
                                history_1.forEach(function (el) {
                                    counter_1 += el.textLength;
                                    timeCounter_1 += el.time;
                                    rawWPM_1 += el.rawwpm;
                                    wpm_1 += el.wpm;
                                    accuracy_1 += el.accuracy;
                                });
                            }
                            setTotalTIme(timeCounter_1);
                            setTotalLetters(counter_1);
                            setTotalRawWPM(rawWPM_1);
                            setTotalWPM(wpm_1);
                            setTotalAccuracy(accuracy_1);
                        }
                        else {
                            navigate('/register');
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        getProfile();
    }, []);
    return (react_2.default.createElement("div", { className: 'profileContainer' }, react_2.default.createElement("div", { className: 'userInfo' }, react_2.default.createElement("h1", null, " Welcome Back, "), react_2.default.createElement("div", { className: 'names' }, react_2.default.createElement("div", { id: 'welcomeUsername', className: 'typed-out' }, " ", username, " ")), react_2.default.createElement("div", { className: 'totalStats' }, react_2.default.createElement("div", { className: 'totalTests groupedStats' }, react_2.default.createElement("div", { className: 'title' }, " Total Tests Completed: "), react_2.default.createElement("div", { className: 'val' }, " ", history.length, " ")), react_2.default.createElement("div", { className: 'totalTimeTyped groupedStats' }, react_2.default.createElement("div", { className: 'title' }, " Total Typing Time: "), react_2.default.createElement("div", { className: 'val' }, " ", totalTime.toFixed(2), "s ")), react_2.default.createElement("div", { className: 'totalLettersTyped groupedStats' }, react_2.default.createElement("div", { className: 'title' }, "Total Letters Typed: "), react_2.default.createElement("div", { className: 'val' }, " ", totalLetters, " ")), react_2.default.createElement("div", { className: 'averageWPM groupedStats' }, react_2.default.createElement("div", { className: 'title' }, "Average WPM:"), react_2.default.createElement("div", { className: 'val' }, ' ', (totalWPM / history.length).toFixed(1), ' ')), react_2.default.createElement("div", { className: 'averageRaw groupedStats' }, react_2.default.createElement("div", { className: 'title' }, " Average Raw:"), react_2.default.createElement("div", { className: 'val' }, ' ', (totalRawWPM / history.length).toFixed(1), ' ')), react_2.default.createElement("div", { className: 'averageAccuracy groupedStats' }, react_2.default.createElement("div", { className: 'title' }, "Average Accuracy:"), react_2.default.createElement("div", { className: 'val' }, ' ', (totalAccuracy / history.length).toFixed(1), "%"))), react_2.default.createElement("div", { className: 'bottomSpacer' }, " ")), history.length > 0 ? (react_2.default.createElement("div", { className: 'trainingHistory' }, react_2.default.createElement("p", { className: 'history' }, " History "), react_2.default.createElement("table", { className: 'tablelol' }, react_2.default.createElement("thead", null, react_2.default.createElement("tr", null, react_2.default.createElement("th", null, "wpm"), react_2.default.createElement("th", null, "raw"), react_2.default.createElement("th", null, "accuracy"), react_2.default.createElement("th", null, "letters/incorrects"), react_2.default.createElement("th", null, "mode"), react_2.default.createElement("th", null, "date"))), react_2.default.createElement("tbody", null, history.map(function (element, index) {
        return react_2.default.createElement(training_history_1.default, { key: index, element: element });
    }))))) : (react_2.default.createElement("div", { className: 'NoMatches' }, " ", react_2.default.createElement(react_router_dom_1.Link, { className: 'link', to: '/' }, "PLAY A GAME"), " "))));
}
exports.default = Profile;
