import { OrderItem } from "src/session/order-item.entity";
import { Table } from "src/table/table.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNumber, ValidateNested, ArrayMinSize, Min, Max, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from "src/session/order-item.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateSessionDto {
    @ApiProperty({ example: 1, description: 'Table ID where session takes place' })
    @IsNumber()
    @Min(1)
    tableId: number;

    @ApiProperty({ example: 4, description: 'Number of people at the table' })
    @IsNumber()
    @Min(1)
    @Max(20)
    partySize: number;

    @ApiProperty({
        type: [CreateOrderItemDto],
        description: 'List of ordered items with menu item IDs and quantities',
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];
}


export class UpdateSessionDto {
    @ApiPropertyOptional({ example: true, description: 'Mark session as completed or not' })
    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;
}


@Entity('sessions')
export class Session {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1 })
    @Column()
    tableId: number;

    @ApiProperty({ type: () => Table, description: 'Table details' })
    @ManyToOne(() => Table)
    @JoinColumn({ name: 'tableId' })
    table: Table;

    @ApiProperty({ example: 4 })
    @Column()
    partySize: number;

    @ApiProperty({ example: false, description: 'Indicates if session is completed' })
    @Column({ default: false })
    isCompleted: boolean;

    @ApiProperty({ example: '2025-06-16T00:12:38.403Z' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ type: () => [OrderItem] })
    @OneToMany(() => OrderItem, orderItem => orderItem.session, { cascade: true })
    orderItems: OrderItem[];
}
