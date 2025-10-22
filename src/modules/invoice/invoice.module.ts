import { Module } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { InvoiceRepository } from "./invoice.repository";
import { ClientModule } from "../client/client.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoice } from "./entities/invoice.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), ClientModule],
  providers: [InvoiceService, InvoiceRepository],
  exports: [],
})
export class InvoiceModule {}
