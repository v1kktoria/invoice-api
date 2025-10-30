import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateClientDto {
  @ApiProperty({ example: "First_Name", description: "Имя клиента" })
  @IsString({ message: "First name must be a string" })
  @MaxLength(50, { message: "First name must not exceed 50 characters" })
  first_name: string;

  @ApiProperty({ example: "Last_Name", description: "Фамилия клиента" })
  @IsString({ message: "Last name must be a string" })
  @MaxLength(50, { message: "Last name must not exceed 50 characters" })
  last_name: string;

  @ApiProperty({ example: "mail@example.com", description: "Электронная почта клиента" })
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000", description: "Уникальный идентификатор компании" })
  @IsUUID("4", { message: "Company ID must be a valid UUID" })
  company_id: string;
}
