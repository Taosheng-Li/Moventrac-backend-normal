// This file extends the Express Request type to include our custom user payload.

declare namespace Express {
  export interface Request {
    user?: {
      userId: string;
      email: string;
      username: string;
    };
  }
}
