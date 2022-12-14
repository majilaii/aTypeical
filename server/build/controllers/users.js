"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putHistory = void 0;
const WPMcalc_1 = __importDefault(require("../utils/WPMcalc"));
const users_1 = __importDefault(require("./../model/users"));
const putHistory = async (req, res) => {
    const { wordAmount, KEnglish, typingMode, date } = req.body;
    const incorrects = req.body.incorrect;
    const textLength = req.body.text;
    const wpm = (0, WPMcalc_1.default)((textLength - incorrects) / 5, req.body.speed);
    const accuracy = (100 * (textLength - incorrects)) / textLength;
    const rawWPM = (0, WPMcalc_1.default)(textLength / 5, req.body.speed);
    await users_1.default.findByIdAndUpdate(req.user._id, {
        $push: {
            history: {
                date,
                wpm: wpm,
                rawwpm: rawWPM,
                textLength: textLength,
                incorrect: incorrects,
                accuracy: accuracy,
                time: req.body.speed / 1000,
                wordAmount,
                KEnglish,
                typingMode,
            },
            $position: 0
        },
    }, { new: true });
    res.sendStatus(201);
};
exports.putHistory = putHistory;
