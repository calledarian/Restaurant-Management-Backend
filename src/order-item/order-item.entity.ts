import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session } from '../session/session.entity';


@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Session, session => session.orderItems)
    session: Session;

    @Column()
    itemName: string;

    @Column('decimal', { precision: 6, scale: 2 })
    price: number;

    @Column()
    quantity: number;
}
