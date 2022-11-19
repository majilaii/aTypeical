// TODO: rename length to be numWords
function WPMcalc(length, time) {
  return Math.round(length / (time / 1000 / 60));
}

module.exports = WPMcalc;
