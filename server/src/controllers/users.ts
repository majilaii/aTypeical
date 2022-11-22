import { Request, Response } from 'express';
import WPMcalc from '../utils/WPMcalc';
import User from './../model/users';

const putHistory = async (req: Request, res: Response) => {
  const { wordAmount, KEnglish, typingMode, date }: { wordAmount: number, KEnglish: string, typingMode: boolean, date: Date } = req.body;
  const incorrects = req.body.incorrect;
  const textLength = req.body.text;
  const wpm = WPMcalc((textLength-incorrects)/5, req.body.speed)
  const accuracy = (100 * (textLength - incorrects)) / textLength;
  const rawWPM = WPMcalc(textLength/5, req.body.speed)
  await User.findByIdAndUpdate(
    (req.user as {_id: number})._id,
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

export default putHistory;
