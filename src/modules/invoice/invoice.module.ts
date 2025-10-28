import { Module } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { InvoiceRepository } from "./invoice.repository";
import { ClientModule } from "../client/client.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoice } from "./entities/invoice.entity";
import { QueueModule } from "../queue/queue.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
     ClientModule,
     QueueModule,
  ],
  providers: [InvoiceService, InvoiceRepository],
  exports: [InvoiceService],
})
export class InvoiceModule {}
