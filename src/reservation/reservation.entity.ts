import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Table } from 'src/table/table.entity';

export enum ReservationStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
}

export class CreateReservationDto {
    table_id: string; // was: tableId: number;
    partySize: number;
    status: ReservationStatus;
    reservedBy?: string;
}


@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Table, table => table.reservations, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'table_id' }) // links the FK column name to the `Table` entity
    table: Table;

    @Column()
    partySize: number;

    @Column({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.PENDING })
    status: ReservationStatus;

    @Column({ nullable: true })
    reservedBy: string;

    @CreateDateColumn()
    createdAt: Date;
}
