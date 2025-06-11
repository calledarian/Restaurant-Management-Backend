import { Reservation } from 'src/reservation/reservation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum TableStatus {
    AVAILABLE = 'available',
    RESERVED = 'reserved',
    OCCUPIED = 'occupied',
}

@Entity('tables')
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; // e.g., "Table 1"

    @Column()
    capacity: number;

    @Column({ type: 'enum', enum: TableStatus, default: TableStatus.AVAILABLE })
    status: TableStatus;

    @Column({ nullable: true })
    location: string;

    @Column({ type: 'text', nullable: true })
    note: string;

    @OneToMany(() => Reservation, reservation => reservation.table)
    reservations: Reservation[];
}
