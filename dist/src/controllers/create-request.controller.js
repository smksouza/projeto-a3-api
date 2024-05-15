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
exports.CreateRequestController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const prisma_service_1 = require("../prisma/prisma.service");
const zod_1 = require("zod");
const createRequestBodySchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    requestType: zod_1.z.string(),
    requestPriority: zod_1.z.string(),
});
const bodyValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(createRequestBodySchema);
let CreateRequestController = class CreateRequestController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handle(body, user) {
        const { title, content, requestType, requestPriority } = body;
        const userId = user.sub;
        await this.prisma.request.create({
            data: {
                title,
                content,
                requestType,
                requestPriority,
                userId,
            },
        });
    }
};
exports.CreateRequestController = CreateRequestController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(bodyValidationPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CreateRequestController.prototype, "handle", null);
exports.CreateRequestController = CreateRequestController = __decorate([
    (0, common_1.Controller)('/request'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CreateRequestController);
//# sourceMappingURL=create-request.controller.js.map