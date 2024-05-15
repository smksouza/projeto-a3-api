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
exports.FetchRequestController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const prisma_service_1 = require("../prisma/prisma.service");
const zod_1 = require("zod");
const pageQueryParamSchema = zod_1.z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(zod_1.z.number().min(1));
const queryValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(pageQueryParamSchema);
let FetchRequestController = class FetchRequestController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handle(user, page) {
        const userId = user.sub;
        const requests = await this.prisma.request.findMany({
            where: {
                userId,
            },
            take: 20,
            skip: (page - 1) * 20,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { requests };
    }
};
exports.FetchRequestController = FetchRequestController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page', queryValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FetchRequestController.prototype, "handle", null);
exports.FetchRequestController = FetchRequestController = __decorate([
    (0, common_1.Controller)('/user/requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FetchRequestController);
//# sourceMappingURL=fetch-requests.controller.js.map