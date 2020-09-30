import HttpException from '../exceptions/HttpException';
import { Request, Response } from 'express';

export const handleError = (err: HttpException) => {
  console.log(err);
  return { status: 404, message: 'Unknown Error' };
};

export const asyncHandler = (fn: (request: Request, response: Response) => any) => {
  return async function (request: Request, response: Response) {
    try {
      const data = await fn(request, response);
      response.json({
        success: true,
        data,
      });
    } catch (err) {
      const statusCode = err.status || 500;
      response.status(statusCode).json({
        success: false,
        error: err.message,
      });
    }
  };
};
