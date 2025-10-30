import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { InvoiceResponseDto } from "./dto/invoice-response.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("invoices")
@Controller("invoices")
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) { }

    @Post()
    @ApiOperation({ summary: "Создать новый счет" })
    @ApiResponse({ status: 201, type: InvoiceResponseDto, description: "Счет успешно создан" })
    async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<InvoiceResponseDto> {
        return this.invoiceService.createInvoice(createInvoiceDto);
    }

    @Get(":id")
    @ApiOperation({ summary: "Получить счет по ID" })
    @ApiResponse({ status: 200, type: InvoiceResponseDto, description: "Данные счета" })
    async getInvoice(@Param("id", ParseUUIDPipe) id: string): Promise<InvoiceResponseDto> {
        return this.invoiceService.getInvoice(id);
    }

    @Delete(":id")
    @HttpCode(204)
    @ApiOperation({ summary: "Удалить счет по ID" })
    @ApiResponse({ status: 204, description: "Счет успешно удален" })
    async deleteInvoice(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
        await this.invoiceService.deleteById(id);
    }
}