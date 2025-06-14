import { Module } from '@nestjs/common';
import { MenuItemController } from './menu-item.controller';
import { MenuItemService } from './menu-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './menu-item.entity';
import { TableModule } from 'src/table/table.module';
import { Reservation } from 'src/reservation/reservation.entity';
import { OrderItem } from 'src/order-item/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuItem, Reservation, OrderItem]),
    TableModule,
  ],
  controllers: [MenuItemController],
  providers: [MenuItemService]
})
export class MenuItemModule { }
