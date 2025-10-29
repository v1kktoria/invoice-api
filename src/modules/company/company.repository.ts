import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "./company.entity";
import { Repository } from "typeorm";

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly repo: Repository<Company>,
  ) {}

  async save(data: Partial<Company>): Promise<Company> {
    return this.repo.save(data);
  }

  findById(id: string): Promise<Company | null> {
    return this.repo.findOne({ where: { id }, relations: ["clients"] });
  }

  async findByName(name: string): Promise<Company | null> {
    return this.repo.findOne({ where: { name } });
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
