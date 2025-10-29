import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { InvoiceResponseDto } from "./dto/invoice-response.dto";

@Controller("invoices")
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) { }

    @Post()
    async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<InvoiceResponseDto> {
        return this.invoiceService.createInvoice(createInvoiceDto);
    }

    @Get(":id")
    async getInvoice(@Param("id", ParseUUIDPipe) id: string): Promise<InvoiceResponseDto> {
        return this.invoiceService.getInvoice(id);
    }

    @Delete(":id")
    async deleteInvoice(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
        await this.invoiceService.deleteById(id);
    }
}