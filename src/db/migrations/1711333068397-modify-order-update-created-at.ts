import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyOrderUpdateCreatedAt1711333068397 implements MigrationInterface {
    name = 'ModifyOrderUpdateCreatedAt1711333068397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department_head" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "department_head" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "business" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "business" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "department_head" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department_head" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "business" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "business" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "business" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "business" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "department_head" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "department_head" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "business" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "business" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department_head" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department_head" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
