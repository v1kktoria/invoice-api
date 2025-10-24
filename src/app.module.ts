import { Module } from '@nestjs/common';
import { TypedConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypedConfigService } from './modules/config/typed.config.service';
import { typeOrmConfig } from './config/typeorm.config';
import { ClientModule } from './modules/client/client.module';
import { CompanyModule } from './modules/company/company.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { PdfModule } from './modules/pdf/pdf.module';

@Module({
  imports: [
    TypedConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [TypedConfigModule],
      inject: [TypedConfigService],
      useFactory: typeOrmConfig,
    }),
    ClientModule,
    CompanyModule,
    InvoiceModule,
    PdfModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
