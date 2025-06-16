import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
} from '@nestjs/swagger';

import { TableService } from './table.service';
import { CreateTableDto } from './table.entity';
import { Table } from './table.entity';

@ApiTags('Tables')
@Controller('tables')
export class TableController {
    constructor(private readonly tableService: TableService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new table' })
    @ApiResponse({ status: 201, description: 'Table created', type: Table })
    create(@Body() createTableDto: CreateTableDto) {
        return this.tableService.create(createTableDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all tables' })
    @ApiResponse({ status: 200, description: 'List of tables', type: [Table] })
    findAll() {
        return this.tableService.findAll();
    }

    @Get('available')
    @ApiOperation({ summary: 'Get all available tables' })
    @ApiResponse({
        status: 200,
        description: 'List of currently available tables',
        type: [Table],
    })
    getAvailableTables() {
        return this.tableService.getAvailableTables();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single table by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Table found', type: Table })
    @ApiResponse({ status: 404, description: 'Table not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tableService.findOne(id);
    }

    @Get(':id/sessions')
    @ApiOperation({ summary: 'Get sessions for a specific table' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: 200,
        description: 'List of sessions for the table',
        type: Object, // Replace with actual DTO if available
    })
    getTableSessions(@Param('id', ParseIntPipe) id: number) {
        return this.tableService.getTableSessions(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a table' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Table updated', type: Table })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTableDto: CreateTableDto,
    ) {
        return this.tableService.update(id, updateTableDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a table' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Table deleted' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.tableService.remove(id);
    }
}
