import { Expose, Type } from "class-transformer";
import { CompanyResponseDto } from "src/modules/company/dto/company-response.dto";

export class ClientResponseDto {
  @Expose()
  id: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  @Expose()
  @Type(() => CompanyResponseDto)
  company: CompanyResponseDto; 

  @Expose()
  created_at: Date;
}
