import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';;
import { AuthModule } from 'src/auth/auth.module';
import { Agenda } from 'src/entities/agenda.entity';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda]), AuthModule],
  controllers: [AgendaController],
  providers: [AgendaService]
})
export class AgendaModule {}