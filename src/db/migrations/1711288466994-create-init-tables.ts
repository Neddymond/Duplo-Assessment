import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitTables1711288466994 implements MigrationInterface {
    name = 'CreateInitTables1711288466994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "reference_id" character varying NOT NULL, "source_name" character varying NOT NULL, "business_id" character varying NOT NULL, "quantity" integer NOT NULL, "item_type" character varying NOT NULL, "totalMoneyAmount" integer NOT NULL, "totalMoneyCurrency" character varying NOT NULL, "totalTaxMoneyAmount" integer NOT NULL, "totalTaxMoneyCurrency" character varying NOT NULL, "totalDiscountMoneyAmount" integer NOT NULL, "totalDiscountMoneyCurrency" character varying NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "business" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "location" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department_head" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "businessId" uuid, CONSTRAINT "PK_7ae0dfd2411b5e2efc39cfafb48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "department_head" ADD CONSTRAINT "FK_cb8e61f376221dea1970fea4e68" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department_head" DROP CONSTRAINT "FK_cb8e61f376221dea1970fea4e68"`);
        await queryRunner.query(`DROP TABLE "department_head"`);
        await queryRunner.query(`DROP TABLE "business"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
