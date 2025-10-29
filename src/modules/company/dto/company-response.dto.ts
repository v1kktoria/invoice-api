import { Expose } from "class-transformer";

export class CompanyResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  created_at: Date;
}
