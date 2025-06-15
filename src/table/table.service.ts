import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableDto, Table } from './table.entity';


@Injectable()
export class TableService {
    constructor(
        @InjectRepository(Table)
        private tableRepository: Repository<Table>,
    ) { }

    async findAll(): Promise<Table[]> {
        return this.tableRepository.find({
            relations: ['sessions'],
        });
    }

    async findOne(id: number): Promise<Table> {
        const table = await this.tableRepository.findOne({
            where: { id },
            relations: ['sessions'],
        });
        if (!table) {
            throw new NotFoundException(`Table with ID ${id} not found`);
        }
        return table;
    }

    async create(createTableDto: CreateTableDto): Promise<Table> {
        const table = this.tableRepository.create(createTableDto);
        return this.tableRepository.save(table);
    }

    async update(id: number, updateTableDto: CreateTableDto): Promise<Table> {
        await this.findOne(id); // Check if exists
        await this.tableRepository.update(id, updateTableDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id); // Check if exists
        await this.tableRepository.delete(id);
    }

    async getTableSessions(id: number): Promise<Table> {
        const table = await this.tableRepository.findOne({
            where: { id },
            relations: ['sessions', 'sessions.orderItems', 'sessions.orderItems.menuItem'],
        });
        if (!table) {
            throw new NotFoundException(`Table with ID ${id} not found`);
        }
        return table;
    }

    async getAvailableTables(): Promise<Table[]> {
        // Tables without active sessions
        return this.tableRepository
            .createQueryBuilder('table')
            .leftJoin('table.sessions', 'session', 'session.isCompleted = false')
            .where('session.id IS NULL')
            .getMany();
    }
}