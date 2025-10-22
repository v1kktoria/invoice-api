import { Expose, Type } from "class-transformer";
import { IsEmail, IsArray, ValidateNested } from "class-validator";

export class InvoiceItemDto {
  @IsArray()
  @Expose()
  description: string;

  @Expose()
  price: number;
}

export class CreateInvoiceDto {
  @IsEmail()
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}