const { dateMDY, dateDMT } = require('../../src/hooks/date')

describe('function dateMDY', () => {
  test('test dateMDY', () => {
    expect(dateMDY(3600 * 24 * 1000)).toBe("2 января 1970 г.");
    expect(dateMDY({date: "12/02/2021 12-00"})).toBe("");
    expect(dateMDY("2012-01-26T13:51:50.417-07:00", "en")).toBe("January 26, 2012");
  })
})

describe('function dateDMT', () => {
  test('test dateDMT', () => {
    expect(dateDMT(3600 * 24 * 1000)).toBe("2 января в 03:00");
    expect(dateDMT({date: "12/02/2021 12-00"})).toBe("");
    expect(dateDMT("2012-01-26T13:51:50.417-07:00", "en")).toBe("January 26 in 11:51 PM");
  })
})
