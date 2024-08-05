import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, Like } from 'typeorm';
import { Agenda } from 'src/entities/agenda.entity';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { QueryDto } from 'src/lib/query.dto';
import fs from 'fs';
import path from 'path';

@Injectable()
export class AgendaService {
    constructor(
        @InjectRepository(Agenda)
        private readonly agendaRepository: Repository<Agenda>,
        private readonly entityManager: EntityManager,
    ) { }

    private readonly logger = new Logger(AgendaService.name);

    async create(createAgendaDto: CreateAgendaDto,  imgSrc: string): Promise<Agenda> {
        let newAgenda: Agenda;

        await this.entityManager.transaction(async transactionalEntityManager => {
            const dataAgenda = { ...createAgendaDto, foto: imgSrc };
            newAgenda = await transactionalEntityManager.save(
                this.agendaRepository.create(dataAgenda),
            );
        });

        return newAgenda!;
    }

    async update(
        id: string,
        updateAgendaDto: UpdateAgendaDto,
        imgSrc?: string,
    ): Promise<Agenda> {
        let updatedAgenda: Agenda;

        await this.entityManager.transaction(async transactionalEntityManager => {
            const agenda = await transactionalEntityManager.findOne(Agenda, { where: { id } });
            if (!agenda) {
                throw new NotFoundException(`Agenda with id ${id} not found`);
            }
            if (imgSrc) {
                const oldImagePath = path.join(__dirname, '../../public/upload/agendas', path.basename(agenda.image));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            const updatedData = {
                ...updateAgendaDto,
                foto: imgSrc || agenda.image,
            };

            Object.assign(agenda, updatedData);
            updatedAgenda = await transactionalEntityManager.save(agenda);
        });

        return updatedAgenda!;
    }

    async findOne(id: string): Promise<Agenda | undefined> {
        return this.agendaRepository.findOne({ where: { id } });
    }

    async findAll(query: QueryDto): Promise<{ data: Agenda[], total: number }> {
        const { limit, page, search, sort, order } = query;

        this.logger.log(`Fetching from DB`);

        const orderOption: { [key: string]: 'ASC' | 'DESC' } = {};
        if (sort && order) {
            orderOption[sort] = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        } else if (order && !sort) {
            orderOption['createdAt'] = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        } else {
            orderOption['createdAt'] = 'DESC';
        }

        const findOptions: any = {
            order: orderOption,
        };

        if (limit && page) {
            findOptions.take = parseInt(limit as any, 10);
            findOptions.skip = (parseInt(page as any, 10) - 1) * findOptions.take;
        }

        if (search) {
            findOptions.where = { title: Like(`%${search}%`) };
        }

        let agendas: Agenda[];
        let total: number;

        if (limit && page) {
            const [result, count] = await this.agendaRepository.findAndCount(findOptions);
            agendas = result;
            total = count;
        } else {
            const result = await this.agendaRepository.find(findOptions);
            agendas = result;
            total = result.length;
        }

        this.logger.log(`DB result - Agendas count: ${agendas.length}, Total count: ${total}`);

        const result = { data: agendas, total };
        return result;
    }

    async remove(id: string): Promise<void> {
        const agenda = await this.agendaRepository.findOne({ where: { id } });
        if (!agenda) {
            throw new NotFoundException(`Agenda with id ${id} not found`);
        }

        const imagePath = path.join(__dirname, '../../public/upload/agendas', path.basename(agenda.image));
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await this.agendaRepository.delete(id);
    }
}
