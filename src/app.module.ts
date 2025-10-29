import { Module } from '@nestjs/common';
import { TypedConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypedConfigService } from './modules/config/typed.config.service';
import { typeOrmConfig } from './config/typeorm.config';
import { ClientModule } from './modules/client/client.module';
import { CompanyModule } from './modules/company/company.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { PdfModule } from './modules/pdf/pdf.module';
import { EmailModule } from './modules/email/email.module';
import { QueueModule } from './modules/queue/queue.module';
import { ProcessorModule } from './modules/processor/processor.module';
import { createGlobalValidationPipe } from './config/validation.pipe';
import { GlobalExceptionFilter } from './common/exceptions/global-exception.filter';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    TypedConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [TypedConfigModule],
      inject: [TypedConfigService],
      useFactory: typeOrmConfig,
    }),
    QueueModule,
    ProcessorModule,
    ClientModule,
    CompanyModule,
    InvoiceModule,
    PdfModule,
    EmailModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: createGlobalValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
