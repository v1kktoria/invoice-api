import { Injectable, NotFoundException } from "@nestjs/common";
import { CompanyRepository } from "./company.repository";
import { Company } from "./company.entity";
import { plainToInstance } from "class-transformer";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { CompanyResponseDto } from "./dto/company-response.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable()
export class CompanyService {
    constructor(private readonly companyRepo: CompanyRepository) { }

    async create(dto: CreateCompanyDto): Promise<CompanyResponseDto> {
        const saved = await this.companyRepo.save(dto);
        return plainToInstance(CompanyResponseDto, saved, { excludeExtraneousValues: true });
    }

    async findById(id: string): Promise<Company> {
        const company = await this.companyRepo.findById(id);
        if (!company) throw new NotFoundException("Company not found");
        return company;
    }

    async updateById(id: string, dto: UpdateCompanyDto): Promise<CompanyResponseDto> {
        const company = await this.companyRepo.findById(id);
        if (!company) throw new NotFoundException("Company not found");

        Object.assign(company, dto);
        const updated = await this.companyRepo.save(company);
        return plainToInstance(CompanyResponseDto, updated, { excludeExtraneousValues: true });
    }

    async deleteById(id: string): Promise<void> {
        const deleted = await this.companyRepo.deleteById(id);
        if (!deleted) throw new NotFoundException("Company not found");
    }
}
