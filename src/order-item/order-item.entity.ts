import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session } from '../session/session.entity';
import { MenuItem } from "src/menu-item/menu-item.entity";
import { IsNumber, Min } from 'class-validator';

export class CreateOrderItemDto {
    @IsNumber()
    menuItemId: number;

    @IsNumber()
    @Min(1)
    quantity: number;
}



@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Session, session => session.orderItems)
    session: Session;

    @ManyToOne(() => MenuItem, { eager: true })
    menuItem: MenuItem;

    @Column()
    quantity: number;
}