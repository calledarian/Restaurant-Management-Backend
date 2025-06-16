import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateMenuItemDto } from './menu-item.entity';
import { MenuItemService } from './menu-item.service';

@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemController {
    constructor(private readonly menuItemService: MenuItemService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new menu item' })
    @ApiBody({ type: CreateMenuItemDto })
    @ApiResponse({ status: 201, description: 'The menu item has been successfully created.' })
    create(@Body() createMenuItemDto: CreateMenuItemDto) {
        return this.menuItemService.create(createMenuItemDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all menu items' })
    @ApiResponse({ status: 200, description: 'Return all menu items.' })
    findAll() {
        return this.menuItemService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a menu item by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Menu item ID' })
    @ApiResponse({ status: 200, description: 'Return the menu item.' })
    @ApiResponse({ status: 404, description: 'Menu item not found.' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.menuItemService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a menu item by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Menu item ID' })
    @ApiBody({ type: CreateMenuItemDto, description: 'Fields to update' })
    @ApiResponse({ status: 200, description: 'The menu item has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Menu item not found.' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMenuItemDto: Partial<CreateMenuItemDto>,
    ) {
        return this.menuItemService.update(id, updateMenuItemDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a menu item by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Menu item ID' })
    @ApiResponse({ status: 200, description: 'The menu item has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Menu item not found.' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.menuItemService.remove(id);
    }
}
