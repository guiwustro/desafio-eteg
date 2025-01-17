import { MigrationInterface, QueryRunner } from 'typeorm';

export class InvitesTable1737074502630 implements MigrationInterface {
  name = 'InvitesTable1737074502630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expirationDate" TIMESTAMP, "maxUses" integer, "currentUses" integer NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aa52e96b44a714372f4dd31a0af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "created_at"`);
    await queryRunner.query(`DROP TABLE "invites"`);
  }
}
