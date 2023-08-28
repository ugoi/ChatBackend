import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotsController } from './bots.controller';

@Module({
  providers: [BotsService],
  controllers: [BotsController]
})
export class BotsModule {}
