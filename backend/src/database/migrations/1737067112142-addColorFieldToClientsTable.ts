import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColorFieldToClientsTable1737067112142
  implements MigrationInterface
{
  name = 'AddColorFieldToClientsTable1737067112142';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "color" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "color"`);
  }
}
