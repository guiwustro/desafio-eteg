import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '@/users/entities/user.entity';

config();

const configService = new ConfigService();

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);

    const email = configService.get<string>('ADMIN_EMAIL');
    const password = configService.get<string>('ADMIN_PASSWORD');

    const existingUser = await repository.findOne({ where: { email } });

    if (existingUser) {
      return;
    }

    if (!email || !password) {
      throw new Error(
        'Variáveis ADMIN_EMAIL e ADMIN_PASSWORD devem estar definidas no .env',
      );
    }
    console.log('password', password);

    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    console.log('password', hashedPassword);

    await repository.insert({
      email: email,
      password: hashedPassword,
    });

    console.log(`Usuário admin (${email}) criado com sucesso!`);
  }
}
