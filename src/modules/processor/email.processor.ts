import { Injectable } from "@nestjs/common";
import { EmailService } from "src/modules/email/email.service";
import { InvoiceService } from "../invoice/invoice.service";
import { InvoiceStatus } from "../invoice/entities/invoice.entity";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Processor("emailQueue", { concurrency: 10 })
@Injectable()
export class EmailProcessor extends WorkerHost {
  constructor(
    private readonly emailService: EmailService,
    private readonly invoiceService: InvoiceService
  ) {
    super();
  }

  async process(job: Job<{ invoiceId: string; pdfBuffer: Buffer }>) {
    const { invoiceId, pdfBuffer } = job.data;

    try {
      const invoiceEntity = await this.invoiceService.getInvoiceEntity(invoiceId);

      await this.invoiceService.updateStatus(invoiceId, InvoiceStatus.PROCESSING);

      await this.emailService.sendInvoice(
        invoiceEntity.client.email,
        `${invoiceEntity.client.first_name} ${invoiceEntity.client.last_name}`,
        pdfBuffer,
        `${invoiceEntity.invoice_number}.pdf`
      );

      await this.invoiceService.updateStatus(invoiceId, InvoiceStatus.SENT);
    } catch (err) {
      await this.invoiceService.updateStatus(invoiceId, InvoiceStatus.FAILED);
      throw err;
    }
  }
}
