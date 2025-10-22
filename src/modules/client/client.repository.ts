import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./client.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly repo: Repository<Client>,
  ) {}

  async findByEmail(email: string): Promise<Client | null> {
    return this.repo.findOne({
      where: { email },
      relations: ["company"],
    });
  }
}