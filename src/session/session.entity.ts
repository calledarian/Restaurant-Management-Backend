import { OrderItem } from "src/order-item/order-item.entity";
import { Table } from "src/table/table.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNumber, ValidateNested, ArrayMinSize, Min, Max, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from "src/order-item/order-item.entity";

export class CreateSessionDto {
    @IsNumber()
    @Min(1)
    tableId: number;

    @IsNumber()
    @Min(1)
    @Max(20)
    partySize: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];
}

export class UpdateSessionDto {
    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;
}


@Entity('sessions')
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tableId: number;

    @ManyToOne(() => Table)
    @JoinColumn({ name: 'tableId' })
    table: Table;

    @Column()
    partySize: number;

    @Column({ default: false })
    isCompleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => OrderItem, orderItem => orderItem.session, { cascade: true })
    orderItems: OrderItem[];
}