import HttpException from '../exceptions/HttpException';

export const handleError = (err: HttpException) => {
  return { status: 404, message: 'Unknown Error' };
};
