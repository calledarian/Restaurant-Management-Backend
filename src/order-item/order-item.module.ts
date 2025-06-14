import { Module } from '@nestjs/common';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './order-item.entity';
import { TableModule } from 'src/table/table.module';
import { MenuItem } from 'src/menu-item/menu-item.entity';
import { Reservation } from 'src/reservation/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem, Reservation, MenuItem]),
    TableModule,
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService]
})
export class OrderItemModule { }
