import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join, resolve } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [join(resolve(__dirname, '..'), '**', 'entities', '*.ts')],
  migrations: [__dirname + '/migrations/*.ts'],
  seeds: [__dirname + '/seeds/*.ts'],
};

export default new DataSource(dataSourceOptions);
