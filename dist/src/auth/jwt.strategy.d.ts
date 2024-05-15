import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { Env } from '@/env';
import { z } from 'zod';
declare const tokenPayloadSchema: z.ZodObject<{
    sub: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sub: string;
}, {
    sub: string;
}>;
export type UserPayload = z.infer<typeof tokenPayloadSchema>;
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigService<Env, true>);
    validate(payload: UserPayload): Promise<{
        sub: string;
    }>;
}
export {};
