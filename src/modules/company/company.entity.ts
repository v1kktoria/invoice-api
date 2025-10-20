import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Client } from "../client/client.entity";

@Entity("companies")
export class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    address: string;

    @OneToMany(() => Client, client => client.company)
    clients: Client[];

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;
}