import jwt from "jsonwebtoken";

export const auth = (secretToken: string) => {
  return (req: any , res: any, next: ()=>void) => {
    const token: string | string[] = req.headers.token || "" ;
    jwt.verify((token as string), secretToken, (err: any , decoded: any) => {
      if (err) req.user = null;
      else req.user = decoded.id;
    });
    next();
  };
};
