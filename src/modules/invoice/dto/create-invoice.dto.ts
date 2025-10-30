import { Type } from "class-transformer";
import { IsEmail, IsArray, ValidateNested } from "class-validator";
import { InvoiceItemDto } from "./invoice-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateInvoiceDto {
  @ApiProperty({ example: "client@example.com", description: "Email клиента для выставления счёта" })
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @ApiProperty({ type: [InvoiceItemDto], description: "Список позиций счёта" })
  @IsArray({ message: "Items must be provided as an array" })
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}