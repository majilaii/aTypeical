const WPMcalc = require('../../utils/WPMcalc')

describe('WPMcalc', () => {
  test.todo('Shouldn\t accept anything but numbers as inputs');

  test('Should give the correct result', () => {
    expect(WPMcalc(60, 60000)).toBe(60);
    expect(WPMcalc(240, 120000)).toBe(120)
  })
})

