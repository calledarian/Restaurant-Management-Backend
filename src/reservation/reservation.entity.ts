import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Table } from 'src/table/table.entity';

export enum ReservationStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
}

export class CreateReservationDto {
    tableId: number;
    partySize: number;
    startTime: Date;
    endTime: Date;
    status?: ReservationStatus;
    note?: string;
    reservedBy?: string;
}

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Table, table => table.reservations, { eager: true })
    table: Table;

    @Column()
    partySize: number;

    @Column('timestamp')
    startTime: Date;

    @Column('timestamp')
    endTime: Date;

    @Column({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.PENDING })
    status: ReservationStatus;

    @Column({ type: 'text', nullable: true })
    note: string;

    @Column({ nullable: true })
    reservedBy: string;

    @CreateDateColumn()
    createdAt: Date;
}
