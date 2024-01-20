import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1705759045675 implements MigrationInterface {
    name = 'Init1705759045675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "district" ALTER COLUMN "geometry" TYPE geometry(MultiPolygon)`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "location" TYPE geometry(Point)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "location" TYPE geometry(POINT,0)`);
        await queryRunner.query(`ALTER TABLE "district" ALTER COLUMN "geometry" TYPE geometry(MULTIPOLYGON,0)`);
    }

}
