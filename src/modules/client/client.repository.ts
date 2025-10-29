import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./client.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly repo: Repository<Client>,
  ) { }

  async save(data: Partial<Client>): Promise<Client> {
    return this.repo.save(data);
  }

  findById(id: string): Promise<Client | null> {
    return this.repo.findOne({
      where: { id },
      relations: ["company"]
    });
  }

  async findByEmail(email: string): Promise<Client | null> {
    return this.repo.findOne({
      where: { email },
      relations: ["company"],
    });
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}