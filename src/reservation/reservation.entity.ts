import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Table } from 'src/table/table.entity';
import { IsInt, IsOptional, IsBoolean, IsString, Min, Max, IsPositive } from 'class-validator';

export class CreateReservationDto {
    @IsInt()
    @IsPositive()
    tableId: number;  // required table reference

    @IsInt()
    @Min(1)
    @Max(10)  // assuming max party size is 20
    partySize: number;

    @IsOptional()
    @IsBoolean()
    isServed?: boolean;  // optional, defaults to false

    @IsOptional()
    @IsString()
    reservedBy?: string;
}

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Table, table => table.reservations, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'tableId' })
    table: Table;

    @Column()
    partySize: number;

    @Column({ type: 'boolean', default: false })
    isServed: boolean;  // false = pending, true = served

    @Column({ nullable: true })
    reservedBy: string;

    @CreateDateColumn()
    createdAt: Date;
}
