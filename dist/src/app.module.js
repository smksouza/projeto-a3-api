"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("./prisma/prisma.service");
const create_user_controller_1 = require("./controllers/create-user.controller");
const env_1 = require("./env");
const auth_module_1 = require("./auth/auth.module");
const authenticate_controller_1 = require("./controllers/authenticate.controller");
const create_request_controller_1 = require("./controllers/create-request.controller");
const fetch_requests_controller_1 = require("./controllers/fetch-requests.controller");
const fetch_recent_requests_controller_1 = require("./controllers/fetch-recent-requests.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validate: (env) => env_1.envSchema.parse(env),
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
        ],
        controllers: [
            create_user_controller_1.CreateUserController,
            authenticate_controller_1.AuthenticateController,
            create_request_controller_1.CreateRequestController,
            fetch_requests_controller_1.FetchRequestController,
            fetch_recent_requests_controller_1.FetchRecentRequestController,
        ],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map