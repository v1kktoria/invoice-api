import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ClientRepository } from "./client.repository";
import { Client } from "./client.entity";
import { CreateClientDto } from "./dto/create-client.dto";
import { ClientResponseDto } from "./dto/client-response.dto";
import { Company } from "../company/company.entity";
import { plainToInstance } from "class-transformer";
import { UpdateClientDto } from "./dto/update-client.dto";

@Injectable()
export class ClientService {
    constructor(private readonly clientRepo: ClientRepository) {}

    async create(dto: CreateClientDto): Promise<ClientResponseDto> {
        const existing = await this.clientRepo.findByEmail(dto.email);
        if (existing) throw new ConflictException(`Client with email ${dto.email} already exists`);

        const saved = await this.clientRepo.save({
            ...dto,
            company: { id: dto.company_id } as Company,
        });

        return plainToInstance(ClientResponseDto, saved, { excludeExtraneousValues: true });
    }

    async findById(id: string): Promise<Client> {
        const client = await this.clientRepo.findById(id);
        if (!client) throw new NotFoundException(`Client not found`);
        return client;
    }

    async findByEmail(email: string): Promise<Client> {
        const client = await this.clientRepo.findByEmail(email);
        if (!client) throw new NotFoundException(`Client with email ${email} not found`);
        return client;
    }

    async updateById(id: string, dto: UpdateClientDto): Promise<ClientResponseDto> {
        const client = await this.clientRepo.findById(id);
        if (!client) throw new NotFoundException("Client not found");

        if (dto.email && dto.email !== client.email) {
            const existing = await this.clientRepo.findByEmail(dto.email);
            if (existing) throw new ConflictException(`Client with email ${dto.email} already exists`);
        }

        Object.assign(client, dto);
        const updated = await this.clientRepo.save(client);
        return plainToInstance(ClientResponseDto, updated, { excludeExtraneousValues: true });
    }

    async deleteById(id: string): Promise<void> {
        const deleted = await this.clientRepo.deleteById(id);
        if (!deleted) throw new NotFoundException("Client not found");
    }
}