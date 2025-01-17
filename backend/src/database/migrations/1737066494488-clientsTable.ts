import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClientsTable1737066494488 implements MigrationInterface {
  name = 'ClientsTable1737066494488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying(11) NOT NULL, "email" character varying(150) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "observations" text, CONSTRAINT "UQ_9921dca81551c93e5a459ef03ce" UNIQUE ("cpf"), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
