import { Reservation } from 'src/reservation/reservation.entity';
import {
    Entity,
    Column,
    OneToMany,
    Index,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tables')
export class Table {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column({ type: 'int', default: 4 })
    capacity: number;

    @Column({ type: 'boolean', default: true })
    @Index()
    isAvailable: boolean;  // true = available, false = reserved/occupied

    @Column({ nullable: true })
    @Index()
    location: string;

    @OneToMany(() => Reservation, reservation => reservation.table, {
        cascade: ['remove'], // optional: remove reservations if the table is deleted
    })
    reservations: Reservation[];
}
