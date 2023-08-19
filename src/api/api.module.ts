import { Module } from '@nestjs/common';
import { SetEnvironmentVarables } from 'config/environment';

SetEnvironmentVarables(`${__dirname}/../environments`, process.env.ENVIRONMENT);

@Module({})
export class ApiModule {}
