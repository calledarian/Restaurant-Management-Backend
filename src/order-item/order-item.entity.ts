import { MenuItem } from "src/menu-item/menu-item.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Reservation, reservation => reservation.orderItems, { onDelete: 'CASCADE' })
    reservation: Reservation;

    @ManyToOne(() => MenuItem, menuItem => menuItem.orderItems)
    menuItem: MenuItem;

    @Column({ default: 1 })
    quantity: number;

    @Column({ nullable: true })
    notes?: string;
}
