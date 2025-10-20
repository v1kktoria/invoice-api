import { Module } from '@nestjs/common';
import { TypedConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypedConfigService } from './modules/config/typed.config.service';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypedConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [TypedConfigModule],
      inject: [TypedConfigService],
      useFactory: typeOrmConfig,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
