import { Module } from "@nestjs/common";
import { Company } from "./company.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [],
  exports: [],
})

export class CompanyModule {}