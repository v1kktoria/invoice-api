import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { CompanyResponseDto } from "./dto/company-response.dto";

@Controller("companies")
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post()
    async create(@Body() dto: CreateCompanyDto): Promise<CompanyResponseDto> {
        return this.companyService.create(dto);
    }

    @Get(":id")
    async findById(@Param("id") id: string): Promise<CompanyResponseDto> {
        return this.companyService.findById(id);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() dto: UpdateCompanyDto): Promise<CompanyResponseDto> {
        return this.companyService.updateById(id, dto);
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<void> {
        await this.companyService.deleteById(id);
    }
}
