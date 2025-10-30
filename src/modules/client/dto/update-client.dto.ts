import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength } from "class-validator";

export class UpdateClientDto {
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
}
