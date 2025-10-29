import { Expose } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class InvoiceItemDto {
  @IsString({ message: "Item description must be a string" })
  @Expose()
  description: string;

  @IsNumber({}, { message: "Item price must be a number" })
  @Min(0.01, { message: "Item price must be greater than 0" })
  @Expose()
  price: number;
}