import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuItemDto, MenuItem } from './menu-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuItemService {
    constructor(
        @InjectRepository(MenuItem)
        private menuItemRepository: Repository<MenuItem>,
    ) { }

    async findAll(): Promise<MenuItem[]> {
        return this.menuItemRepository.find();
    }

    async findOne(id: number): Promise<MenuItem> {
        const menuItem = await this.menuItemRepository.findOne({ where: { id } });
        if (!menuItem) {
            throw new NotFoundException(`Menu Item with ID ${id} not found`);
        }
        return menuItem;
    }

    async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
        const menuItem = this.menuItemRepository.create(createMenuItemDto);
        return this.menuItemRepository.save(menuItem);
    }

    async update(id: number, updateMenuItemDto: Partial<CreateMenuItemDto>): Promise<MenuItem> {
        await this.findOne(id); // Check if exists
        await this.menuItemRepository.update(id, updateMenuItemDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id); // Check if exists
        await this.menuItemRepository.delete(id);
    }
}
