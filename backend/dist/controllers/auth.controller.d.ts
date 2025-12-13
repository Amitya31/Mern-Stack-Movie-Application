import type { Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: "user" | "admin";
            };
        }
    }
}
export declare const Register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const Login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map