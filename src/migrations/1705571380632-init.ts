import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1705571380632 implements MigrationInterface {
    name = 'Init1705571380632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."score_subject_enum" AS ENUM('math', 'science', 'english')`);
        await queryRunner.query(`CREATE TABLE "score" ("memberId" integer NOT NULL, "subject" "public"."score_subject_enum" NOT NULL, "score" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "CHK_6437767f9ce36795d8d556bb78" CHECK ("score" >= 0 AND "score" <= 100), CONSTRAINT "PK_f0b27a59e5c40958701ee224b77" PRIMARY KEY ("memberId", "subject"))`);
        await queryRunner.query(`CREATE TABLE "member" ("id" SERIAL NOT NULL, "name" character varying(10) NOT NULL, "nickname" character varying(20) NOT NULL, "birthday" character varying(10) NOT NULL, "location" geometry(Point) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_172627dfe3ea9ffc50e5ca8464c" UNIQUE ("nickname"), CONSTRAINT "CHK_9e8f7e7b76d3e08f6e9ac6b392" CHECK ("birthday" ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "district" ("id" SERIAL NOT NULL, "osm_id" character varying(10) NOT NULL, "geometry" geometry(MultiPolygon) NOT NULL, CONSTRAINT "UQ_b48401fad6bfb11a726ebc4aa65" UNIQUE ("osm_id"), CONSTRAINT "PK_ee5cb6fd5223164bb87ea693f1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_5dda735c34231e83c5424740936" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_5dda735c34231e83c5424740936"`);
        await queryRunner.query(`DROP TABLE "district"`);
        await queryRunner.query(`DROP TABLE "member"`);
        await queryRunner.query(`DROP TABLE "score"`);
        await queryRunner.query(`DROP TYPE "public"."score_subject_enum"`);
    }

}
