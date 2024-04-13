import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/auth/current-user.decorator'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { UserPayload } from '@/auth/jwt.strategy'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const createRequestBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  requestType: z.string(),
  requestPriority: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createRequestBodySchema)

type CreateRequestBodySchema = z.infer<typeof createRequestBodySchema>

@Controller('/request')
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
