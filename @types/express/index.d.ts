import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: string | null;
      files?: any;
    }
  }
}

export {}