import { Module } from "@nestjs/common";
import { InvoiceModule } from "../invoice/invoice.module";
import { PdfModule } from "../pdf/pdf.module";
import { EmailModule } from "../email/email.module";
import { QueueModule } from "../queue/queue.module";
import { PdfProcessor } from "./pdf.processor";
import { EmailProcessor } from "./email.processor";

@Module({
  imports: [
    QueueModule,
    InvoiceModule,
    PdfModule,
    EmailModule,
  ],
  providers: [PdfProcessor, EmailProcessor],
})
export class ProcessorModule {}