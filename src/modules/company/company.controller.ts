import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { CompanyResponseDto } from "./dto/company-response.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("сompanies")
@Controller("companies")
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post()
    @ApiOperation({ summary: "Создать новую компанию" })
    @ApiResponse({ status: 201, type: CompanyResponseDto, description: "Компания успешно создана" })
    async create(@Body() dto: CreateCompanyDto): Promise<CompanyResponseDto> {
        return this.companyService.create(dto);
    }

    @Get(":id")
    @ApiOperation({ summary: "Получить компанию по ID" })
    @ApiResponse({ status: 200, type: CompanyResponseDto })
    async findById(@Param("id") id: string): Promise<CompanyResponseDto> {
        return this.companyService.findById(id);
    }

    @Put(":id")
    @ApiOperation({ summary: "Обновить данные компании" })
    @ApiResponse({ status: 200, type: CompanyResponseDto, description: "Компания успешно обновлена" })
    async update(@Param("id") id: string, @Body() dto: UpdateCompanyDto): Promise<CompanyResponseDto> {
        return this.companyService.updateById(id, dto);
    }

    @Delete(":id")
    @HttpCode(204)
    @ApiOperation({ summary: "Удалить компанию" })
    @ApiResponse({ status: 204, description: "Компания успешно удалена" })
    async delete(@Param("id") id: string): Promise<void> {
        await this.companyService.deleteById(id);
    }
}
