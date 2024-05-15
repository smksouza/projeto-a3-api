import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/prisma/prisma.service';
import { z } from 'zod';
declare const authenticateBodySchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;
export declare class AuthenticateController {
    private jwt;
    private prisma;
    constructor(jwt: JwtService, prisma: PrismaService);
    handle(body: AuthenticateBodySchema): Promise<{
        access_token: string;
    }>;
}
export {};
