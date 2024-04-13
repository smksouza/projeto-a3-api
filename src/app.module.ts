import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateUserController } from './controllers/create-user.controller'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateRequestController } from './controllers/create-request.controller'
import { FetchRequestController } from './controllers/fetch-requests.controller'
import { FetchRecentRequestController } from './controllers/fetch-recent-requests.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateUserController,
    AuthenticateController,
    CreateRequestController,
    FetchRequestController,
    FetchRecentRequestController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
