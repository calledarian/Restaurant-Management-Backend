import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateMenuItemDto } from './menu-item.entity';
import { MenuItemService } from './menu-item.service';


@Controller('menu-items')
export class MenuItemController {
    constructor(private readonly menuItemService: MenuItemService) { }

    @Post()
    create(@Body() createMenuItemDto: CreateMenuItemDto) {
        return this.menuItemService.create(createMenuItemDto);
    }

    @Get()
    findAll() {
        return this.menuItemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.menuItemService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMenuItemDto: Partial<CreateMenuItemDto>,
    ) {
        return this.menuItemService.update(id, updateMenuItemDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.menuItemService.remove(id);
    }
}