const userController = require('../../controllers/users')

const mockDB = {}

jest.mock('../../model/users', () => {
  return {
    findByIdAndUpdate: (id, obj) => mockDB[id] = obj
  };
})

describe('Users', () => {
  describe('putHistory', () => {
    test('initial test', () => {
      userController.putHistory({body: {wordAmount:10, KEnglish:true, typingMode:1, date:Date.now()}, user:{_id:1}}, {sendStatus:(status)=>console.log(status)})
      console.log(mockDB[1])
    })
  })
})