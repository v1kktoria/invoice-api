import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Invoice } from "./invoice.entity";

@Entity("invoice_items")
export class InvoiceItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Invoice, invoice => invoice.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "invoice_id" })
  invoice: Invoice;

  @Column("text")
  description: string;

  @Column("numeric", { precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;
}