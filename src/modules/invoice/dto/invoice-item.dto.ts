import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class InvoiceItemDto {
  @ApiProperty({ example: "Website development services", description: "Описание позиции счёта" })
  @IsString({ message: "Item description must be a string" })
  @Expose()
  description: string;

  @ApiProperty({ example: 199.99, description: "Стоимость позиции" })
  @IsNumber({}, { message: "Item price must be a number" })
  @Min(0.01, { message: "Item price must be greater than 0" })
  @Expose()
  price: number;
}