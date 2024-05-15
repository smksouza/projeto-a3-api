import { UserPayload } from '@/auth/jwt.strategy';
import { PrismaService } from '@/prisma/prisma.service';
import { z } from 'zod';
declare const createRequestBodySchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    requestType: z.ZodString;
    requestPriority: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    requestType: string;
    requestPriority: string;
}, {
    title: string;
    content: string;
    requestType: string;
    requestPriority: string;
}>;
type CreateRequestBodySchema = z.infer<typeof createRequestBodySchema>;
export declare class CreateRequestController {
    private prisma;
    constructor(prisma: PrismaService);
    handle(body: CreateRequestBodySchema, user: UserPayload): Promise<void>;
}
export {};
