import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { TableModule } from 'src/table/table.module';
import { OrderItem } from 'src/order-item/order-item.entity';
import { MenuItem } from 'src/menu-item/menu-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, OrderItem, MenuItem]),
    TableModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule { }
