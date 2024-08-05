import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedAdminUser() {
    const adminUser = await this.userRepository.findOne({ where: { role: 'admin' } });
    
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('adminpassword', 10);

      const user = this.userRepository.create({
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      });

      await this.userRepository.save(user);
      console.log('Admin user seeded');
    } else {
      console.log('Admin user already exists');
    }
  }
}
