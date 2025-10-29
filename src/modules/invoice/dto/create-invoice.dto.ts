import { Type } from "class-transformer";
import { IsEmail, IsArray, ValidateNested } from "class-validator";
import { InvoiceItemDto } from "./invoice-item.dto";

export class CreateInvoiceDto {
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @IsArray({ message: "Items must be provided as an array" })
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}