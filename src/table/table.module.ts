import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './table.entity';
import { Reservation } from 'src/reservation/reservation.entity';
import { OrderItem } from 'src/order-item/order-item.entity';
import { MenuItem } from 'src/menu-item/menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Table, Reservation, OrderItem, MenuItem])],

  controllers: [TableController],
  providers: [TableService],
  exports: [TableService, TypeOrmModule],
})
export class TableModule { }
