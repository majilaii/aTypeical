function WPMcalc(numWords: number, time: number): number {
  return Math.round(numWords / (time / 1000 / 60));
}

export default WPMcalc;
