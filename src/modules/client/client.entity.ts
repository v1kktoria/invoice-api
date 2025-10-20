import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../company/company.entity";
import { Invoice } from "../invoice/entities/invoice.entity";

@Entity("clients")
export class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    firstName: string;

    @Column({ type: "text" })
    lastName: string;

    @Column({ type: "text", unique: true })
    email: string;

    @ManyToOne(() => Company, company => company.clients, { onDelete: "RESTRICT" })
    @JoinColumn({ name: "company_id" })
    company: Company;

    @OneToMany(() => Invoice, invoice => invoice.client)
    invoices: Invoice[];

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;
}
