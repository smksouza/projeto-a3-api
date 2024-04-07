import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const createRequestBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  requestType: z.string(),
  requestPriority: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createRequestBodySchema)

type CreateRequestBodySchema = z.infer<typeof createRequestBodySchema>

@Controller('/resquests')
@UseGuards(JwtAuthGuard)
export class CreateRequestController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateRequestBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, requestType, requestPriority } = body
    const userId = user.sub

    await this.prisma.request.create({
      data: {
        title,
        content,
        requestType,
        requestPriority,
        userId,
      },
    })
  }
}
