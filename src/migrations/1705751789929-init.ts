import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1705751789929 implements MigrationInterface {
    name = 'Init1705751789929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_5dda735c34231e83c5424740936"`);
        await queryRunner.query(`ALTER TABLE "district" ALTER COLUMN "geometry" TYPE geometry(MultiPolygon)`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "location" TYPE geometry(Point)`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_5dda735c34231e83c5424740936" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_5dda735c34231e83c5424740936"`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "location" TYPE geometry(POINT,0)`);
        await queryRunner.query(`ALTER TABLE "district" ALTER COLUMN "geometry" TYPE geometry(MULTIPOLYGON,0)`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_5dda735c34231e83c5424740936" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
