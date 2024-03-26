import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyOrderTableRemoveFields1711313910557 implements MigrationInterface {
    name = 'ModifyOrderTableRemoveFields1711313910557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "business_id"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalMoneyAmount"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalMoneyCurrency"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalTaxMoneyAmount"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalTaxMoneyCurrency"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalDiscountMoneyAmount"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalDiscountMoneyCurrency"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "total_money" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "total_tax_money" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "total_discount_money" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "businessId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_7f744b8c2bdab4a97c1d6306b72" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_7f744b8c2bdab4a97c1d6306b72"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "businessId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total_discount_money"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total_tax_money"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total_money"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalDiscountMoneyCurrency" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalDiscountMoneyAmount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalTaxMoneyCurrency" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalTaxMoneyAmount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalMoneyCurrency" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalMoneyAmount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "business_id" character varying NOT NULL`);
    }

}
