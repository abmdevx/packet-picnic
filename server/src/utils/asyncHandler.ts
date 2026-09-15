import type { Request, Response, NextFunction } from "express";

const asyncHandler = <P = {}, ResBody = any, ReqBody = any, ReqQuery = any>(
  requestHandler: (
    req: Request<P, any, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => Promise<unknown>
) => {
  return (
    req: Request<P, any, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => {
    Promise
    .resolve(requestHandler(req, res, next))
    .catch(next);
  };
};

export default asyncHandler;