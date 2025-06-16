import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session } from './session.entity';
import { MenuItem } from "src/menu-item/menu-item.entity";
import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderItemDto {
    @ApiProperty({ example: 1, description: 'Menu item ID' })
    @IsNumber()
    menuItemId: number;

    @ApiProperty({ example: 2, description: 'Quantity of the menu item' })
    @IsNumber()
    @Min(1)
    quantity: number;
}

@Entity('order_items')
export class OrderItem {
    @ApiProperty({ example: 1, description: 'Order item ID' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 5, description: 'Associated session ID' })
    @Column()
    sessionId: number;

    @ManyToOne(() => Session, session => session.orderItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sessionId' })
    session: Session;

    @ApiProperty({ example: 1, description: 'Associated menu item ID' })
    @Column()
    menuItemId: number;

    @ManyToOne(() => MenuItem)
    @JoinColumn({ name: 'menuItemId' })
    menuItem: MenuItem;

    @ApiProperty({ example: 3, description: 'Quantity ordered' })
    @Column()
    quantity: number;
}
