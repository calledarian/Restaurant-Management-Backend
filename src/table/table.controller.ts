import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './table.entity';


@Controller('tables')
export class TableController {
    constructor(private readonly tableService: TableService) { }

    @Post()
    create(@Body() createTableDto: CreateTableDto) {
        return this.tableService.create(createTableDto);
    }

    @Get()
    findAll() {
        return this.tableService.findAll();
    }

    @Get('available')
    getAvailableTables() {
        return this.tableService.getAvailableTables();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tableService.findOne(id);
    }

    @Get(':id/sessions')
    getTableSessions(@Param('id', ParseIntPipe) id: number) {
        return this.tableService.getTableSessions(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTableDto: CreateTableDto,
    ) {
        return this.tableService.update(id, updateTableDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.tableService.remove(id);
    }
}