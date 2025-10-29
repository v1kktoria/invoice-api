import { Module } from "@nestjs/common";
import { Company } from "./company.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { CompanyRepository } from "./company.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Company])
],
  providers: [CompanyService, CompanyRepository],
  exports: [],
  controllers: [CompanyController],
})

export class CompanyModule {}