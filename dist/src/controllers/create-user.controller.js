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
exports.CreateUserController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcryptjs_1 = require("bcryptjs");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const createUserBodySchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    cpf: zod_1.z.string().length(11),
    phone: zod_1.z.string(),
    DistrictCouncil: zod_1.z.string(),
});
let CreateUserController = class CreateUserController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handle(body) {
        const { name, email, password, cpf, DistrictCouncil, phone } = body;
        const userWithSameEmail = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        const cpfAlreadyExists = await this.prisma.user.findUnique({
            where: {
                cpf,
            },
        });
        if (userWithSameEmail || cpfAlreadyExists) {
            throw new common_1.ConflictException('User with same e-mail address or CPF already exists.');
        }
        const hashPassword = await (0, bcryptjs_1.hash)(password, 8);
        await this.prisma.user.create({
            data: {
                name,
                email,
                cpf,
                password: hashPassword,
                DistrictCouncil,
                phone,
            },
        });
    }
};
exports.CreateUserController = CreateUserController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(createUserBodySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateUserController.prototype, "handle", null);
exports.CreateUserController = CreateUserController = __decorate([
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CreateUserController);
//# sourceMappingURL=create-user.controller.js.map