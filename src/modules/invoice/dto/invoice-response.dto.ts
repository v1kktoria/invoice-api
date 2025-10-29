import { Expose, Type } from "class-transformer";
import { InvoiceStatus } from "../entities/invoice.entity";
import { InvoiceItemDto } from "./invoice-item.dto";

export class InvoiceResponseDto {
  @Expose()
  id: string;

  @Expose()
  invoice_number: string;

  @Expose()
  total: number;

  @Expose()
  status: InvoiceStatus;

  @Expose()
  created_at: Date;

  @Expose()
  clientEmail: string;

  @Expose()
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}
