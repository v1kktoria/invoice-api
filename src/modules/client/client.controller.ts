import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { ClientResponseDto } from "./dto/client-response.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("clients")
@Controller("clients")
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post()
    @ApiOperation({ summary: "Создать клиента" })
    @ApiResponse({ status: 201, type: ClientResponseDto, description: "Клиент успешно создан" })
    async create(@Body() dto: CreateClientDto): Promise<ClientResponseDto> {
        return this.clientService.create(dto);
    }

    @Get(":id")
    @ApiOperation({ summary: "Получить клиента по ID" })
    @ApiResponse({ status: 200, type: ClientResponseDto, description: "Данные клиента" })
    async findById(@Param("id") id: string): Promise<ClientResponseDto> {
        return this.clientService.findById(id);
    }

    @Put(":id")
    @ApiOperation({ summary: "Обновить данные клиента" })
    @ApiResponse({ status: 200, type: ClientResponseDto, description: "Клиент успешно обновлён" })
    async update(@Param("id") id: string, @Body() dto: UpdateClientDto): Promise<ClientResponseDto> {
        return this.clientService.updateById(id, dto);
    }

    @Delete(":id")
    @HttpCode(204)
    @ApiOperation({ summary: "Удалить клиента по ID" })
    @ApiResponse({ status: 204, description: "Клиент успешно удалён" })
    async delete(@Param("id") id: string): Promise<void> {
        await this.clientService.deleteById(id);
    }
}
