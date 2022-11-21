function WPMcalc(numWords, time) {
  return Math.round(numWords / (time / 1000 / 60));
}

module.exports = WPMcalc;
