const authController = require('../../controllers/auth')
const mocks = require('../__mocks__/mocks')
const passport = require('passport');

let mockDB = [{id: 1, created: 1658850932460, username: 'Vadim', email: 'vadim@cw.com', password: 'secureHashedPassword', history: [], }]

jest.mock('../../model/users', () => {
  return {
    findByIdAndUpdate: (id, obj) => {
      let entry = mockDB.find(user => user.id === id);
      if (obj['$push']) {
        for (let key of Object.keys(obj['$push'])) {
          const pushingTo = key;
          let toPush = obj['$push'][key];
          if (toPush['$each']) {
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
    },
    findOne: (obj, cb) => {
      return mockDB.find(el => {
        return Object.keys(obj).every(key => obj[key] === el[key])
      })
    }
  };
})


describe('Auth Controller', () => {
  describe('Logout', () => {
    test('calls req.logout', () => {
      let valid = false;
      authController.logout({logout: (cb) => {
        valid = true;
        cb();
      }}, {send: obj => {}})
      expect(valid).toBe(true);
    })
  })

  describe('Profile', () => {
    test('sends back the currently logged in user', () => {
      let res;
      authController.profile({user: mocks.mockUser}, {
        send: (obj) => res = obj
      })
      expect(res).toBe(mocks.mockUser)
    })
  })

  describe('Login', () => {
    test.todo('Should call req.logIn after successful login')//, () => {
    //   authController.login({
    //       body: {username: 'Vadim', password: 'secureHashedPassword'}, 
    //       logIn:(user, cb) => console.log({user})
    //     }, 
    //     {send: (msg) => console.log(msg)}, 
    //     (req, res, next) => console.log(req, res, next)
    //   )
    // })
  })
})