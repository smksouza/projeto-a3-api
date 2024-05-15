import { PrismaService } from '@/prisma/prisma.service';
import { z } from 'zod';
declare const createUserBodySchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    cpf: z.ZodString;
    phone: z.ZodString;
    DistrictCouncil: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    DistrictCouncil: string;
}, {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    DistrictCouncil: string;
}>;
type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;
export declare class CreateUserController {
    private prisma;
    constructor(prisma: PrismaService);
    handle(body: CreateUserBodySchema): Promise<void>;
}
export {};
