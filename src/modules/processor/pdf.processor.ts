import { Injectable } from "@nestjs/common";
import { Processor, WorkerHost, InjectQueue } from "@nestjs/bullmq";
import { Job, Queue } from "bullmq";
import { PdfService } from "src/modules/pdf/pdf.service";
import { InvoiceService } from "../invoice/invoice.service";
import { InvoiceStatus } from "../invoice/entities/invoice.entity";

@Processor("pdfQueue", { concurrency: 3 })
@Injectable()
export class PdfProcessor extends WorkerHost {
  constructor(
    private readonly pdfService: PdfService,
    private readonly invoiceService: InvoiceService,
    @InjectQueue("emailQueue") private readonly emailQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<{ invoiceId: string }>) {
  const { invoiceId } = job.data;

    try {
      const invoiceEntity = await this.invoiceService.getInvoiceEntity(invoiceId);

      await this.invoiceService.updateStatus(invoiceId, InvoiceStatus.PROCESSING);

      const pdfBuffer = await this.pdfService.generateInvoice(invoiceEntity);

      await this.emailQueue.add("sendEmail", { invoiceId, pdfBuffer }, {
        jobId: invoiceId,
        attempts: 5,
        backoff: { type: "exponential", delay: 2000 },
      });
    } catch (err) {
      await this.invoiceService.updateStatus(invoiceId, InvoiceStatus.FAILED);
      throw err;
    }
  }
}