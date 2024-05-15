"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const prisma_service_1 = require("../prisma/prisma.service");
const zod_1 = require("zod");
const authenticateBodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
let AuthenticateController = class AuthenticateController {
    jwt;
    prisma;
    constructor(jwt, prisma) {
        this.jwt = jwt;
        this.prisma = prisma;
    }
    async handle(body) {
        const { email, password } = body;
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User credentials do not match.');
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('User credentials do not match.');
        }
        const accessToken = this.jwt.sign({ sub: user.id });
        return {
            access_token: accessToken,
        };
    }
};
exports.AuthenticateController = AuthenticateController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(authenticateBodySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticateController.prototype, "handle", null);
exports.AuthenticateController = AuthenticateController = __decorate([
    (0, common_1.Controller)('/sessions'),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthenticateController);
//# sourceMappingURL=authenticate.controller.js.map