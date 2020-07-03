import HttpException from '../exceptions/HttpException';

export const handleError = (err: HttpException) => {
  console.log(err);
  return { status: 404, message: 'Unknown Error' };
};
