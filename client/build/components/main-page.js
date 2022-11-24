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
require("../css/main-page.css");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const index_1 = __importDefault(require("../APIService/index"));
const choiceBar_1 = __importDefault(require("./choiceBar"));
const hooks_1 = require("../redux/hooks");
const authenticated_1 = __importDefault(require("../redux/actions/authenticated"));
const reset_1 = __importDefault(require("../redux/actions/reset"));
function Main() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { reset, typingMode } = (0, hooks_1.useAppSelector)((state) => {
        return {
            reset: state.resetReducer.reset,
            typingMode: state.typingModeReducer.typingMode
        };
    });
    const linkTarget = {
        pathname: '/',
        key: Math.random(),
        state: {
            applied: true,
        },
    };
    const { setIncorrect, setSpeed, text, setText, author, setPrevInputLength, } = (0, react_router_dom_1.useOutletContext)();
    const [checkFirstInput, setCheckInput] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const inputRef = (0, react_1.useRef)(null);
    let interval;
    (0, react_1.useEffect)(() => {
        async function isLoggedIn() {
            const res = await index_1.default.profile();
            if (!res) {
                localStorage.removeItem('userData');
                dispatch(authenticated_1.default.logout());
            }
            else
                dispatch(authenticated_1.default.login());
        }
        isLoggedIn();
    }, [dispatch]);
    (0, react_1.useEffect)(() => {
        if (checkFirstInput !== false) {
            // TODO replace setInterval function
            interval = setInterval(() => {
                try {
                    if (inputRef.current.value.length) {
                        setPrevInputLength((arr) => [
                            ...arr,
                            inputRef.current.value.length,
                        ]);
                    }
                }
                catch (err) {
                    clearInterval(interval);
                }
            }, 1000);
        }
    }, [checkFirstInput]);
    (0, react_1.useEffect)(() => {
        window.addEventListener('keydown', focus);
        inputRef.current.value = '';
        setCheckInput(false);
        setLoading(false);
    }, [reset]);
    const preventCopyPaste = (e) => {
        e.preventDefault();
    };
    function focus() {
        inputRef.current.focus();
    }
    // TODO move into a separate file (separate into smaller functions)
    function textValidate(e) {
        let value = e.target.value;
        if (checkFirstInput === false) {
            setCheckInput(true);
            setSpeed(Date.now());
        }
        for (let i = 0; i < value.length; i++) {
            const current = text[i];
            if (current.letter === value[i]) {
                current.correct = 'correct';
            }
            else {
                current.correct = 'incorrect';
            }
        }
        if (text[value.length + 1]) {
            text[value.length].correct = 'neutral';
            text[value.length].active = 'false';
        }
        // TODO remove for-loop and use length instead
        for (let i = 0; i < value.length; i++) {
            if (text[i + 1] && text[i + 1].correct === 'neutral') {
                text[i].active = 'true';
                break;
            }
            let current = text[i];
            current.active = 'false';
        }
        setText([...text]);
        if (value.length === text.length) {
            const currentTime = new Date();
            // TODO try moving the line below to the reset function
            setIncorrect(0);
            for (let obj of text) {
                for (let key in obj) {
                    if (obj[key] === 'incorrect') {
                        setIncorrect((incorrect) => (incorrect += 1));
                    }
                }
            }
            setSpeed((time) => currentTime - time);
            setPrevInputLength((arr) => [...arr, value.length]);
            clearInterval(interval);
            navigate('/stats');
        }
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "Main-container" },
            react_1.default.createElement(choiceBar_1.default, { setCheckInput: setCheckInput }),
            react_1.default.createElement("div", { className: "typing-container", id: "typingContainer" },
                react_1.default.createElement("p", { onCopy: (e) => preventCopyPaste(e), onPaste: (e) => preventCopyPaste(e), onCut: (e) => preventCopyPaste(e), id: "textArea" }, text.map((el, i) => {
                    return (react_1.default.createElement("span", { className: `${el.correct === 'neutral'
                            ? 'neutral'
                            : el.correct === 'correct'
                                ? 'correct'
                                : 'incorrect'} ${el.active === 'true' ? 'active' : ''}`, key: i, id: i }, el.letter));
                })),
                typingMode === 'QUOTES' && react_1.default.createElement("span", { className: "author" },
                    "- ",
                    author)),
            react_1.default.createElement("div", { className: "inputDiv" },
                react_1.default.createElement("input", { ref: inputRef, id: "mainPageInput", type: "text", className: "inputBar", onChange: textValidate }),
                react_1.default.createElement(react_router_dom_1.Link, { to: linkTarget, className: "linkReset" },
                    react_1.default.createElement("button", { className: "resetButton", onClick: () => {
                            (dispatch((0, reset_1.default)()));
                        } }, "Reset"))))));
}
exports.default = Main;
