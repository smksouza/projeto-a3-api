import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  cpf: z.string().length(11),
  phone: z.string(),
  DistrictCouncil: z.string(),
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

@Controller('/user')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateUserBodySchema) {
    const { name, email, password, cpf, DistrictCouncil, phone } =
      createUserBodySchema.parse(body)

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    const cpfAlreadyExists = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    if (userWithSameEmail || cpfAlreadyExists) {
      throw new ConflictException(
        'User with same e-mail address or CPF already exists.',
      )
    }

    const hashPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        cpf,
        password: hashPassword,
        DistrictCouncil,
        phone,
      },
    })
  }
}
