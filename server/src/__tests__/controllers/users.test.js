const userController = require('../../controllers/users');
const { mockUser } = require('../__mocks__/mocks');
const mocks = require('../__mocks__/mocks')

let mockDB = [mocks.mockUser]

// TODO: Make less implementation specific
jest.mock('../../model/users', () => {
  return {
    findByIdAndUpdate: (id, obj) => {
      let entry = mockDB.find(user => user.id === id);
      if (obj['$push']) {
        for (let key of Object.keys(obj['$push'])) {
          const pushingTo = key;
          let toPush = obj['$push'][key];
          if (toPush['$each']) {
            // TODO: make use of $position
            for (let each of (toPush['$each'])) {
              entry[pushingTo].push(each);
            }
          } else {
            entry[key].push(toPush);
          }
        }
      } else {
        for (let key of Object.keys(obj)) {
          entry[key] = obj[key];
        }
      }
    },
    deleteMany: obj => {
      mockDB = [];
    }
  };
})

describe('Users', () => {
  beforeEach(() => {
    mockDB = [mockUser]
  })

  describe('putHistory', () => {
    test('Stores in database', () => {
      userController.putHistory(mocks.reqBodyPutHistory, {sendStatus:() => {}})
      expect(mockDB[0].history.length).toBe(1)
    })

    test('Has the correct values', () => {
      userController.putHistory(mocks.reqBodyPutHistory, {sendStatus:() => {}})
      expect(mockDB[0].history[0]).toStrictEqual(mocks.putHistoryOut)
    })
  })

  describe('deleteAll', () => {
    test('Deletes eveything in the database', () => {
      userController.deleteAll({}, {send:()=>{}});
      expect(mockDB.length).toBe(0);
    })
  })
})