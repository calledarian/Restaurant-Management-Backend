import { OrderItem } from "src/order-item/order-item.entity";
import { Table } from "src/table/table.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('sessions')
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Table, { eager: true })
    table: Table;

    @Column()
    partySize: number;

    @Column({ default: false })
    isCompleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => OrderItem, order => order.session, { cascade: true, eager: true })
    orderItems: OrderItem[];
}
