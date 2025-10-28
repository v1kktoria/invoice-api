import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TypedConfigService } from '../config/typed.config.service';
import { getRedisConfig } from 'src/config/redis.config';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [TypedConfigService],
      useFactory: (config: TypedConfigService) => getRedisConfig(config),
    }),
    BullModule.registerQueue({ name: "pdfQueue" }),
    BullModule.registerQueue({ name: "emailQueue" }),
  ],
  exports: [BullModule],
})
export class QueueModule {}