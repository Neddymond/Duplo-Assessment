import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyOrderRemoveTotalTaxMoney1711373298697 implements MigrationInterface {
    name = 'ModifyOrderRemoveTotalTaxMoney1711373298697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total_tax_money"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "total_tax_money" text NOT NULL`);
    }

}
