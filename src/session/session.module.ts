import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from '../order-item/order-item.entity';
import { SessionController } from './session.controller';
import { Table } from 'src/table/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Table])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule { }
