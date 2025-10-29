import { IsEmail, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateClientDto {
  @IsString({ message: "First name must be a string" })
  @MaxLength(50, { message: "First name must not exceed 50 characters" })
  first_name: string;

  @IsString({ message: "Last name must be a string" })
  @MaxLength(50, { message: "Last name must not exceed 50 characters" })
  last_name: string;

  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @IsUUID("4", { message: "Company ID must be a valid UUID" })
  company_id: string;
}
