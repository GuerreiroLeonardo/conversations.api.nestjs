import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ResponseDTO,
  ResponseFactory,
} from 'application/common/response.factory';
import { ConnectionService } from 'infrastructure/services/connection.service';
import { GetStatusQuery } from './get-status.query';
import { GetStatusQueryResponse } from './get-status.response';

@QueryHandler(GetStatusQuery)
export class GetStatusQueryHandler implements IQueryHandler<GetStatusQuery> {
  constructor(private readonly _connectionService: ConnectionService) {}

  async execute(
    query: GetStatusQuery,
  ): Promise<ResponseDTO<GetStatusQueryResponse>> {
    try {
      const connected = await this._connectionService.getStatus();
      console.log('Conectado: ', connected);
      if (!connected) {
        throw new Error('Not connected');
      }
      const response = new GetStatusQuery();
      return ResponseFactory.Success(response);
    } catch (err) {
      return ResponseFactory.Error(err.message);
    }
  }
}
