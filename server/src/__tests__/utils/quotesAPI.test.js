const mocks = require('../__mocks__/mocks')
const FetchQuotes = require('../../utils/quotesAPI')

jest.mock('cross-fetch', () => {
  return jest.fn((url) => {
      const urlObj = new URL(url);
      const urlParams = new URLSearchParams(urlObj.searchParams);
      if (urlParams.get('minLength') === '100' && urlParams.get('maxLength') === '300') {
        return Promise.resolve({
          json: () => Promise.resolve(mocks.quoteDefault)
        })
      } else if (urlParams.get('minLength') === '200' && urlParams.get('maxLength') === '250') {
        return Promise.resolve({
          json: () => Promise.resolve(mocks.quote)
        })
      }
    })
  }
);

describe('FetchQuotes', ()=>{
  test('It should fetch a quote with default values', async () => {
    const res = await FetchQuotes();
    expect(res).toStrictEqual(mocks.quoteDefaultResponse)
  })

  test('It should fetch a quote with explicit values', async () => {
    const res = await FetchQuotes(200, 250);
    expect(res).toStrictEqual(mocks.quoteResponse)
  })
})
