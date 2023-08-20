import { Controller, Get, Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BaseController } from 'api/controllers/base.controller';
import { GetStatusQuery } from 'application/queries/get-status/get-status.query';
import { GetStatusQueryResponse } from 'application/queries/get-status/get-status.response';

@Controller({ version: '1', path: 'connection' })
export default class GetStatusController extends BaseController {
  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    super(commandBus, queryBus);
  }

  @Get('status')
  async getConnectionStatus(@Res() ctxResponse) {
    return await this.SendQuery<GetStatusQueryResponse>(
      ctxResponse,
      new GetStatusQuery(),
    );
  }
}
