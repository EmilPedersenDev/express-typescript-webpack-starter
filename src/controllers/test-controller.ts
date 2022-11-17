import { Request, Response } from 'express';

export const testApiCall = (req: Request, res: Response) => {
  res.json({
    status: 200,
    data: {
      message: 'Test api call',
    },
  });
};
