import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, Min } from 'class-validator';
import { Session } from '../session/session.entity';
import { ApiProperty } from '@nestjs/swagger';


export class CreateTableDto {
    @ApiProperty({
        example: 4,
        description: 'Maximum number of people the table can accommodate',
    })
    @IsInt()
    @Min(1)
    capacity: number;
}


@Entity('tables')
export class Table {
    @ApiProperty({ example: 1, description: 'Unique identifier for the table' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 4, description: 'Capacity of the table' })
    @Column({ type: 'int' })
    capacity: number;

    @ApiProperty({
        type: () => Session,
        isArray: true,
        description: 'Sessions associated with this table',
        required: false,
    })
    @OneToMany(() => Session, (session) => session.table)
    sessions: Session[];
}