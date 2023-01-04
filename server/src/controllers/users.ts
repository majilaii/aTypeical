import { Request, Response } from 'express';
import WPMcalc from '../utils/WPMcalc';
import User from './../model/users';

export const putHistory = async (req: Request, res: Response) => {
  const { wordAmount, difficulty, typingMode, date }: { wordAmount: number, difficulty: 'EASY' | 'MEDIUM' | 'HARD', typingMode: 'WORDS' | 'QUOTES', date: Date } = req.body;
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
          difficulty,
          typingMode,
        },
        $position: 0
      },
    },
    { new: true }
  );

  res.sendStatus(201);
};
