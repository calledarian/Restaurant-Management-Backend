import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from 'src/session/order-item.entity';

export class CreateMenuItemDto {
    @ApiProperty({ example: 'Margherita Pizza', description: 'Name of the menu item' })
    @IsString()
    name: string;

    @ApiProperty({ example: 12.99, description: 'Price of the menu item' })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiPropertyOptional({ example: 'Classic pizza with fresh mozzarella and basil', description: 'Description of the menu item' })
    @IsOptional()
    @IsString()
    description?: string;
}

@Entity('menu_items')
export class MenuItem {
    @ApiProperty({ example: 1, description: 'Unique identifier of the menu item' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Margherita Pizza', description: 'Name of the menu item' })
    @Column()
    name: string;

    @ApiProperty({ example: 12.99, description: 'Price of the menu item' })
    @Column('decimal', { precision: 6, scale: 2 })
    price: number;

    @ApiPropertyOptional({ example: 'Classic pizza with fresh mozzarella and basil', description: 'Description of the menu item' })
    @Column({ nullable: true })
    description?: string;

    @ApiProperty({ type: () => [OrderItem], description: 'Order items that include this menu item' })
    @OneToMany(() => OrderItem, order => order.menuItem, { cascade: true })
    orderItems: OrderItem[];
}
