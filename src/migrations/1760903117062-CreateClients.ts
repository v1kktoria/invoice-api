import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClients1760903117062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "clients",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "uuid"
                },
                {
                    name: "firstName",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "lastName",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "email",
                    type: "text",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "company_id",
                    type: "uuid",
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "timestamptz",
                    default: "NOW()"
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["company_id"],
                    referencedTableName: "companies",
                    referencedColumnNames: ["id"],
                    onDelete: "SET NULL"
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clients", true);
    }
}
