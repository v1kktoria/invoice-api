import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompanies1760902831800 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "companies",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "uuid"
                },
                {
                    name: "name",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "address",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamptz",
                    default: "NOW()"
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("companies", true);
    }
}
