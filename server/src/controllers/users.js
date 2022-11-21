const WPMcalc = require('../utils/WPMcalc');
const User = require('./../model/users');

const putHistory = async (req, res) => {
  ({ wordAmount, KEnglish, typingMode, date } = req.body);
  const incorrects = req.body.incorrect;
  const textLength = req.body.text;
  const wpm = WPMcalc((textLength-incorrects)/5, req.body.speed)
  const accuracy = (100 * (textLength - incorrects)) / textLength;
  const rawWPM = WPMcalc(textLength/5, req.body.speed)
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        history: {
          date,
          wpm: wpm,
          rawwpm: rawWPM,
          textLength: textLength,
          incorrect: incorrects,
          accuracy: accuracy,
          time: req.body.speed/1000,
          wordAmount,
          KEnglish,
          typingMode,
        },
        $position: 0
      },
    },
    { new: true }
  );

  res.sendStatus(201);
};

module.exports = { putHistory };
