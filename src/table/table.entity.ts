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
    @Index()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', default: 4 })
    capacity: number;

    @Index()
    @Column({ type: 'boolean', default: true })
    isAvailable: boolean;  // true = available, false = reserved/occupied

    @Index()
    @Column({ nullable: true })
    location: string;

    @OneToMany(() => Reservation, reservation => reservation.table, { cascade: ['remove'] })
    reservations: Reservation[];
}
