import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientRepository } from "./client.repository";
import { Client } from "./client.entity";

@Injectable()
export class ClientService {
    constructor(private readonly clientRepo: ClientRepository) { }

    async findByEmail(email: string): Promise<Client> {
        const client = await this.clientRepo.findByEmail(email);
        if (!client) throw new NotFoundException(`Client with email ${email} not found`);
        return client;
    }
}