import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch User Requests (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    await app.init()
  })

  test('[GET] /user/requests', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
        cpf: '00000000000',
        phone: '71900000000',
        DistrictCouncil: 'Prefeitura-Bairro Cidade Baixa',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .get('/user/requests')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
