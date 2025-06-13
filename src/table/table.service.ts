import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table, TableStatus } from './table.entity';

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(Table)
        private tableRepository: Repository<Table>,
    ) { }

    findAll(): Promise<Table[]> {
        return this.tableRepository.find();
    }

    async findOne(id: number): Promise<Table> {
        const table = await this.tableRepository.findOneBy({ id });
        if (!table) {
            throw new NotFoundException(`Table with ID ${id} not found`);
        }
        return table;
    }

    async create(tableInfo: Partial<Table>): Promise<Table> {
        const newTable = this.tableRepository.create(tableInfo);
        return await this.tableRepository.save(newTable);
    }

    async update(id: number, tableInfo: Partial<Table>): Promise<Table> {
        await this.tableRepository.update(id, tableInfo);
        const updated = await this.tableRepository.findOneBy({ id });
        if (!updated) {
            throw new NotFoundException(`Table with ID ${id} not found`);
        }
        return updated;
    }

    async updateTableStatus(table_id: number, status: TableStatus): Promise<Table> {
        const table = await this.tableRepository.findOne({ where: { id: table_id } });

        if (!table) {
            throw new NotFoundException('Table not found');
        }

        table.status = status;
        return await this.tableRepository.save(table);
    }

    async remove(id: number): Promise<void> {
        const deleteResult = await this.tableRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new NotFoundException(`Table with ID ${id} not found`);
        }
    }
}
