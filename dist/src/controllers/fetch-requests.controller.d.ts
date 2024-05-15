import { UserPayload } from '@/auth/jwt.strategy';
import { PrismaService } from '@/prisma/prisma.service';
import { z } from 'zod';
declare const pageQueryParamSchema: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, number, string | undefined>, z.ZodNumber>;
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;
export declare class FetchRequestController {
    private prisma;
    constructor(prisma: PrismaService);
    handle(user: UserPayload, page: PageQueryParamSchema): Promise<{
        requests: {
            id: string;
            title: string;
            content: string;
            requestType: string;
            requestPriority: string;
            createdAt: Date;
            updatedAt: Date | null;
            userId: string;
        }[];
    }>;
}
export {};
