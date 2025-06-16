import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    sessionId: number;

    @ManyToOne(() => Session, session => session.orderItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sessionId' })
    session: Session;

    @Column()
    menuItemId: number;

    @ManyToOne(() => MenuItem)
    @JoinColumn({ name: 'menuItemId' })
    menuItem: MenuItem;

    @Column()
    quantity: number;
}