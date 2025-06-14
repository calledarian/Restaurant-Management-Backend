import { OrderItem } from 'src/order-item/order-item.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('menu_items')
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column()
    category: string;

    @Column({ default: true })
    available: boolean;

    @OneToMany(() => OrderItem, orderItem => orderItem.menuItem)
    orderItems: OrderItem[];
}
