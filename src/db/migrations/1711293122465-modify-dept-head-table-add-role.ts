import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyDeptHeadTableAddRole1711293122465 implements MigrationInterface {
    name = 'ModifyDeptHeadTableAddRole1711293122465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department_head" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department_head" DROP COLUMN "role"`);
    }

}
