import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInvoices1760903585180 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "invoices",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "uuid"
                },
                {
                    name: "client_id",
                    type: "uuid",
                    isNullable: false
                },
                {
                    name: "total",
                    type: "numeric",
                    precision: 10,
                    scale: 2,
                    isNullable: false
                },
                {
                    name: "tax",
                    type: "numeric",
                    precision: 10,
                    scale: 2,
                    default: 0
                },
                {
                    name: "invoice_number",
                    type: "text",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "status",
                    type: "enum",
                    enum: ["queued", "processing", "sent", "failed"],
                    default: "'queued'"
                },
                {
                    name: "created_at",
                    type: "timestamptz",
                    default: "NOW()"
                },
                {
                    name: "updated_at",
                    type: "timestamptz",
                    default: "NOW()"
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["client_id"],
                    referencedTableName: "clients",
                    referencedColumnNames: ["id"],
                    onDelete: "RESTRICT"
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("invoices", true);
    }
}
