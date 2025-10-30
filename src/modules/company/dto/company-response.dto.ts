import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CompanyResponseDto {
  @ApiProperty({ example: "c1a2b3d4-5e6f-7a8b-9c0d-ef1234567890", description: "Уникальный идентификатор компании" })
  @Expose()
  id: string;

  @ApiProperty({ example: "Example Company", description: "Название компании" })
  @Expose()
  name: string;

  @ApiProperty({ example: "123 Main St, City, Country", description: "Адрес компании" })
  @Expose()
  address: string;

  @ApiProperty({ example: "2025-10-30T12:45:00.000Z", description: "Дата создания записи" })
  @Expose()
  created_at: Date;
}
