import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from 'application/application.module';
import { SetEnvironmentVarables } from 'config/environment';
import GetStatusController from './controllers/v1/connection/get-status.controller';

SetEnvironmentVarables(`${__dirname}/../environments`, process.env.ENVIRONMENT);

@Module({
  imports: [CqrsModule, ApplicationModule],
  controllers: [
    // CreateConversationController,
    // CreateCompanyController,
    GetStatusController,
    // GetCompanyController,
    // GetCompaniesController,
  ],
})
export class ApiModule {}
