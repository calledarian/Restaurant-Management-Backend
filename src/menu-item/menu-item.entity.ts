import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNumber, Min, IsOptional, IsBoolean } from 'class-validator';
import { OrderItem } from 'src/order-item/order-item.entity';

export class CreateMenuItemDto {
    @IsString()
    name: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsOptional()
    @IsString()
    description?: string;

}

@Entity('menu_items')
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; // e.g., "Margherita Pizza"

    @Column('decimal', { precision: 6, scale: 2 })
    price: number; // e.g., 12.99

    @Column({ nullable: true })
    description?: string; // optional

    @OneToMany(() => OrderItem, order => order.menuItem, { cascade: true })
    orderItems: OrderItem[];


}
