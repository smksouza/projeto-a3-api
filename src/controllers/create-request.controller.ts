import { Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller('/resquests')
@UseGuards(AuthGuard('jwt'))
export class CreateRequestController {
  constructor() {}

  @Post()
  async handle() {
    return 'ok'
  }
}
