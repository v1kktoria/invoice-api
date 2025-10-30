import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { CompanyResponseDto } from "src/modules/company/dto/company-response.dto";

export class ClientResponseDto {
  @ApiProperty({ example: "b3a1f9d4-7b2f-4d71-a1e5-9c9f9b12a7de", description: "Уникальный идентификатор клиента" })
  @Expose()
  id: string;

  @ApiProperty({ example: "First_Name", description: "Имя клиента" })
  @Expose()
  first_name: string;

  @ApiProperty({ example: "Last_Name", description: "Фамилия клиента" })
  @Expose()
  last_name: string;

  @ApiProperty({ example: "mail@example.com", description: "Электронная почта клиента" })
  @Expose()
  email: string;

  @ApiProperty({ type: () => CompanyResponseDto, description: "Информация о компании клиента" })
  @Expose()
  @Type(() => CompanyResponseDto)
  company: CompanyResponseDto; 

  @ApiProperty({ example: "2025-10-30T12:45:00.000Z", description: "Дата создания записи" })
  @Expose()
  created_at: Date;
}
