import { Reservation } from 'src/reservation/reservation.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Index,
} from 'typeorm';

export enum TableStatus {
    AVAILABLE = 'available',
    RESERVED = 'reserved',
}

@Entity('tables')
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ unique: true })
    table_id: string; // e.g., "T01", "T02"

    @Column()
    capacity: number;

    @Index()
    @Column({ type: 'enum', enum: TableStatus, default: TableStatus.AVAILABLE })
    status: TableStatus;

    @Index()
    @Column({ nullable: true })
    location: string;

    @OneToMany(() => Reservation, reservation => reservation.table, { cascade: true })
    reservations: Reservation[];
}
