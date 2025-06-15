import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, Min } from 'class-validator';
import { Session } from '../session/session.entity';


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
    capacity: number;

    @OneToMany(() => Session, (session) => session.table)
    sessions: Session[];

}
