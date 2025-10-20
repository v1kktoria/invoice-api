import { Client } from "src/modules/client/client.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InvoiceItem } from "./invoiceitem.entity";

export enum InvoiceStatus {
  QUEUED = "queued",
  PROCESSING = "processing",
  SENT = "sent",
  FAILED = "failed"
}

@Entity("invoices")
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Client, client => client.invoices, {onDelete: "RESTRICT" })
  @JoinColumn({ name: "client_id" })
  client: Client;

  @OneToMany(() => InvoiceItem, item => item.invoice, { cascade: true })
  items: InvoiceItem[];

  @Column("numeric", { precision: 10, scale: 2 })
  total: number;

  @Column("numeric", { precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column({ unique: true })
  invoice_number: string;

  @Column({ type: "enum", enum: InvoiceStatus, default: InvoiceStatus.QUEUED })
  status: InvoiceStatus;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at: Date;
}