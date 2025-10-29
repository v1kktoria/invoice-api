import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { ClientResponseDto } from "./dto/client-response.dto";

@Controller("clients")
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async create(@Body() dto: CreateClientDto): Promise<ClientResponseDto> {
        return this.clientService.create(dto);
    }

    @Get(":id")
    async findById(@Param("id") id: string): Promise<ClientResponseDto> {
        return this.clientService.findById(id);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() dto: UpdateClientDto): Promise<ClientResponseDto> {
        return this.clientService.updateById(id, dto);
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<void> {
        await this.clientService.deleteById(id);
    }
}
