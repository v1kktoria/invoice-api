import { IsString, MaxLength } from "class-validator";

export class CreateCompanyDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(200)
  address: string;
}
