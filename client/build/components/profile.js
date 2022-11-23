"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("../css/profile.css");
const react_router_dom_1 = require("react-router-dom");
const APIService_1 = __importDefault(require("../APIService"));
const training_history_1 = __importDefault(require("../profile-components/training-history"));
const react_2 = __importDefault(require("react"));
const hooks_1 = require("../redux/hooks");
const authenticated_1 = __importDefault(require("../redux/actions/authenticated"));
function Profile() {
    // TODO move to context (or Redux)
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const [username, setUsername] = (0, react_1.useState)(null);
    const [history, setHistory] = (0, react_1.useState)([]);
    const [totalTime, setTotalTIme] = (0, react_1.useState)(0);
    const [totalLetters, setTotalLetters] = (0, react_1.useState)(0);
    const [totalWPM, setTotalWPM] = (0, react_1.useState)(0);
    const [totalRawWPM, setTotalRawWPM] = (0, react_1.useState)(0);
    const [totalAccuracy, setTotalAccuracy] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const getProfile = async () => {
            const userInfo = await APIService_1.default.profile();
            if (userInfo) {
                const { username, history } = userInfo;
                setUsername(username);
                dispatch(authenticated_1.default.login());
                setHistory(history);
                let counter = 0;
                let timeCounter = 0;
                let rawWPM = 0;
                let wpm = 0;
                let accuracy = 0;
                if (history.length) {
                    history.forEach((el) => {
                        counter += el.textLength;
                        timeCounter += el.time;
                        rawWPM += el.rawwpm;
                        wpm += el.wpm;
                        accuracy += el.accuracy;
                    });
                }
                setTotalTIme(timeCounter);
                setTotalLetters(counter);
                setTotalRawWPM(rawWPM);
                setTotalWPM(wpm);
                setTotalAccuracy(accuracy);
            }
            else {
                navigate('/register');
            }
        };
        getProfile();
    }, []);
    return (react_2.default.createElement("div", { className: 'profileContainer' },
        react_2.default.createElement("div", { className: 'userInfo' },
            react_2.default.createElement("h1", null, " Welcome Back, "),
            react_2.default.createElement("div", { className: 'names' },
                react_2.default.createElement("div", { id: 'welcomeUsername', className: 'typed-out' },
                    " ",
                    username,
                    " ")),
            react_2.default.createElement("div", { className: 'totalStats' },
                react_2.default.createElement("div", { className: 'totalTests groupedStats' },
                    react_2.default.createElement("div", { className: 'title' }, " Total Tests Completed: "),
                    react_2.default.createElement("div", { className: 'val' },
                        " ",
                        history.length,
                        " ")),
                react_2.default.createElement("div", { className: 'totalTimeTyped groupedStats' },
                    react_2.default.createElement("div", { className: 'title' }, " Total Typing Time: "),
                    react_2.default.createElement("div", { className: 'val' },
                        " ",
                        totalTime.toFixed(2),
                        "s ")),
                react_2.default.createElement("div", { className: 'totalLettersTyped groupedStats' },
                    react_2.default.createElement("div", { className: 'title' }, "Total Letters Typed: "),
                    react_2.default.createElement("div", { className: 'val' },
                        " ",
                        totalLetters,
                        " ")),
                react_2.default.createElement("div", { className: 'averageWPM groupedStats' },
                    react_2.default.createElement("div", { className: 'title' }, "Average WPM:"),
                    react_2.default.createElement("div", { className: 'val' },
                        ' ',
                        (totalWPM / history.length).toFixed(1),
                        ' ')),
                react_2.default.createElement("div", { className: 'averageRaw groupedStats' },
                    react_2.default.createElement("div", { className: 'title' }, " Average Raw:"),
                    react_2.default.createElement("div", { className: 'val' },
                        ' ',
                        (totalRawWPM / history.length).toFixed(1),
                        ' ')),
                react_2.default.createElement("div", { className: 'averageAccuracy groupedStats' },
                    react_2.default.createElement("div", { className: 'title' }, "Average Accuracy:"),
                    react_2.default.createElement("div", { className: 'val' },
                        ' ',
                        (totalAccuracy / history.length).toFixed(1),
                        "%"))),
            react_2.default.createElement("div", { className: 'bottomSpacer' }, " ")),
        history.length > 0 ? (react_2.default.createElement("div", { className: 'trainingHistory' },
            react_2.default.createElement("p", { className: 'history' }, " History "),
            react_2.default.createElement("table", { className: 'tablelol' },
                react_2.default.createElement("thead", null,
                    react_2.default.createElement("tr", null,
                        react_2.default.createElement("th", null, "wpm"),
                        react_2.default.createElement("th", null, "raw"),
                        react_2.default.createElement("th", null, "accuracy"),
                        react_2.default.createElement("th", null, "letters/incorrects"),
                        react_2.default.createElement("th", null, "mode"),
                        react_2.default.createElement("th", null, "date"))),
                react_2.default.createElement("tbody", null, history.map((element, index) => {
                    return react_2.default.createElement(training_history_1.default, { key: index, element: element });
                }))))) : (react_2.default.createElement("div", { className: 'NoMatches' },
            " ",
            react_2.default.createElement(react_router_dom_1.Link, { className: 'link', to: '/' }, "PLAY A GAME"),
            " "))));
}
exports.default = Profile;
