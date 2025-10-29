import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { InvoiceRepository } from "./invoice.repository";
import { InvoiceStatus } from "./entities/invoice.entity";
import { InvoiceItem } from "./entities/invoiceitem.entity";
import { ClientService } from "../client/client.service";
import { InvoiceResponseDto } from "./dto/invoice-response.dto";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { TypedConfigService } from "../config/typed.config.service";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";

@Injectable()
export class InvoiceService {
    constructor(
        private readonly invoiceRepo: InvoiceRepository,
        private readonly clientService: ClientService,
        private readonly config: TypedConfigService,
        @InjectQueue("pdfQueue") private readonly pdfQueue: Queue,
    ) { }

    async createInvoice(dto: CreateInvoiceDto): Promise<InvoiceResponseDto> {
        const client = await this.clientService.findByEmail(dto.email);

        const total = dto.items.reduce((sum, i) => sum + Number(i.price), 0);
        const invoiceNumber = `INV-${Date.now()}`;
        const tax = this.calculateTax(total);

        const invoice = await this.invoiceRepo.save({
            client,
            items: dto.items.map(i => Object.assign(new InvoiceItem(), i)),
            total,
            tax,
            invoice_number: invoiceNumber,
            status: InvoiceStatus.QUEUED,
        });

        await this.pdfQueue.add("generatePdf", { invoiceId: invoice.id }, {
            jobId: invoice.id,
            attempts: 3,
            backoff: { type: "exponential", delay: 1000 },
        });

        return plainToInstance(InvoiceResponseDto, { ...invoice, clientEmail: invoice.client?.email },
            { excludeExtraneousValues: true },
        );
    }

    async getInvoice(id: string): Promise<InvoiceResponseDto> {
        const invoice = await this.invoiceRepo.findById(id);
        if (!invoice) throw new NotFoundException(`Invoice not found`);

        return plainToInstance(InvoiceResponseDto, { ...invoice, clientEmail: invoice.client.email },
            { excludeExtraneousValues: true },
        );
    }

    async getInvoiceEntity(id: string) {
        const invoice = await this.invoiceRepo.findById(id);
        if (!invoice) throw new NotFoundException(`Invoice not found`);
        return invoice;
    }

    async updateStatus(id: string, status: InvoiceStatus): Promise<void> {
        await this.invoiceRepo.updateStatus(id, status);
    }

    async deleteById(id: string): Promise<void> {
        const deleted = await this.invoiceRepo.deleteById(id);
        if (!deleted) throw new NotFoundException(`Invoice not found`);
    }

    private calculateTax(total: number): number {
        const taxRate = this.config.get("taxRate");
        return Number((total * taxRate).toFixed(2));
    }
}
