import { Expose, Type } from "class-transformer";
import { InvoiceStatus } from "../entities/invoice.entity";

export class InvoiceItemResponseDto {
  @Expose()
  description: string;

  @Expose()
  price: number;
}

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
  @Type(() => String)
  clientEmail?: string;

  @Expose()
  @Type(() => InvoiceItemResponseDto)
  items: InvoiceItemResponseDto[];
}
