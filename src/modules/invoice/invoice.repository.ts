import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Invoice, InvoiceStatus } from "./entities/invoice.entity";
import { Repository } from "typeorm";

@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly repo: Repository<Invoice>,
  ) {}

  async save(data: Partial<Invoice>): Promise<Invoice> {
    return this.repo.save(data);
  }

  async findById(id: string): Promise<Invoice | null> {
    return this.repo.findOne({
      where: { id },
      relations: ["client", "client.company", "items"],
    });
  }

  async updateStatus(id: string, status: InvoiceStatus): Promise<void> {
    this.repo.update({ id }, { status });
  }
}
