import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInvoiceItems1760904864155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "invoice_items",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "uuid"
                },
                {
                    name: "invoice_id",
                    type: "uuid",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "price",
                    type: "numeric",
                    precision: 10,
                    scale: 2
                },
                {
                    name: "created_at",
                    type: "timestamptz",
                    default: "NOW()"
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["invoice_id"],
                    referencedTableName: "invoices",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE"
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("invoice_items", true);
    }
}
