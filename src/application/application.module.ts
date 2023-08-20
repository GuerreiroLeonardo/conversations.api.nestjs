import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfrastructureModule } from 'infrastructure/infrastructure.module';
import { GetStatusQueryHandler } from './queries/get-status/get-status.query.handler';

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [GetStatusQueryHandler],
  exports: [GetStatusQueryHandler],
})
export class ApplicationModule {}
