import { Controller, Get, Post, Param, Body, Patch, Delete, BadRequestException } from '@nestjs/common';
import { TableService } from './table.service';
import { Table, TableStatus } from './table.entity';

@Controller('/tables')
export class TableController {
    constructor(private readonly tableService: TableService) { }

    @Get()
    findAll(): Promise<Table[]> {
        return this.tableService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Table> {
        return this.tableService.findOne(Number(id));
    }

    @Post()
    create(@Body() tableInfo: Partial<Table>): Promise<Table> {
        return this.tableService.create(tableInfo);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() tableInfo: Partial<Table>): Promise<Table> {
        return this.tableService.update(Number(id), tableInfo);
    }

    @Patch(':table_id/status')
    async updateTableStatus(
        @Param('table_id') table_id: string,
        @Body('status') status: TableStatus,
    ) {
        const numericTableId = Number(table_id);
        if (isNaN(numericTableId)) {
            throw new BadRequestException('Invalid table ID');
        }
        return await this.tableService.updateTableStatus(numericTableId, status);
    }


    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.tableService.remove(Number(id));
    }
}
