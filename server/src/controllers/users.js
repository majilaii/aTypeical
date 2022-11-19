// const jwt = require('jsonwebtoken');
const User = require('./../model/users');

const putHistory = async (req, res) => {
  ({ wordAmount, KEnglish, typingMode, date } = req.body);
  const time = req.body.speed / 1000;
  const incorrects = req.body.incorrect;
  const textLength = req.body.text;
  // TODO: Use WPMCalc util
  const wpm = Math.round((textLength - incorrects) / 5 / (time / 60));
  const accuracy = (100 * (textLength - incorrects)) / textLength;
  const rawWPM = Math.round(textLength / 5 / (time / 60));
  await User.findByIdAndUpdate(
    req.user._id,

    {
      $push: {
        history: {
          $each: [
            // TODO remove $each
            {
              date,
              wpm: wpm,
              rawwpm: rawWPM,
              textLength: textLength,
              incorrect: incorrects,
              accuracy: accuracy,
              time: time,
              wordAmount,
              KEnglish,
              typingMode,
            },
          ],
          $position: 0,
        },
      },
    },
    { new: true }
  );

  res.sendStatus(201);
};

// TODO use just in Postman
const deleteAll = async (req, res) => {
  await User.deleteMany({});
  res.send('deleted all users');
};

module.exports = { deleteAll, putHistory };
