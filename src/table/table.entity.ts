import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, Min } from 'class-validator';

export class CreateTableDto {
    @IsInt()
    @Min(1)
    capacity: number;
}


@Entity('tables')
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    capacity: number; // Maximum number of guests this table can seat
}
