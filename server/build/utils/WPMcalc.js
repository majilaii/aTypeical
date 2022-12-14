"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function WPMcalc(numWords, time) {
    return Math.round(numWords / (time / 1000 / 60));
}
exports.default = WPMcalc;
