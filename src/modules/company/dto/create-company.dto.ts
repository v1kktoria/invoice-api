import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreateCompanyDto {
  @ApiProperty({ example: "Example Company", description: "Название компании" })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: "123 Main St, City, Country", description: "Адрес компании" })
  @IsString()
  @MaxLength(200)
  address: string;
}
