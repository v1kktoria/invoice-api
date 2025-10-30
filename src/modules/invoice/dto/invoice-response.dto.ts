import { Expose, Type } from "class-transformer";
import { InvoiceStatus } from "../entities/invoice.entity";
import { InvoiceItemDto } from "./invoice-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class InvoiceResponseDto {
  @ApiProperty({ example: "d3f4a5b6-7c8d-4e9f-0123-456789abcdef", description: "Уникальный идентификатор счёта" })
  @Expose()
  id: string;

  @ApiProperty({ example: "INV-1698675600000", description: "Номер счёта" })
  @Expose()
  invoice_number: string;

  @ApiProperty({ example: 299.99, description: "Общая сумма счёта" })
  @Expose()
  total: number;

  @ApiProperty({ example: 24.50, description: "Сумма налога по счёту" })
  @Expose()
  tax: number;

  @ApiProperty({ example: InvoiceStatus.QUEUED, description: "Статус счёта" })
  @Expose()
  status: InvoiceStatus;

  @ApiProperty({ example: "2025-10-30T12:45:00.000Z", description: "Дата создания счёта" })
  @Expose()
  created_at: Date;

  @ApiProperty({ example: "client@example.com", description: "Email клиента" })
  @Expose()
  clientEmail: string;

  @ApiProperty({ type: [InvoiceItemDto], description: "Список позиций счёта" })
  @Expose()
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}
