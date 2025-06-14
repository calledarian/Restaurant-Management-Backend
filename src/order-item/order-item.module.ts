import { Module } from '@nestjs/common';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../session/session.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  controllers: [OrderItemController],
  providers: [OrderItemService]
})
export class OrderItemModule { }
