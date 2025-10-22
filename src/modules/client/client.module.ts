import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./client.entity";
import { ClientRepository } from "./client.repository";
import { ClientService } from "./client.service";

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientRepository, ClientService],
  exports: [ClientService],
})

export class ClientModule {}
