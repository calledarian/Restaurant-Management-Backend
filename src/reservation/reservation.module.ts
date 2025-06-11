import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { TableModule } from 'src/table/table.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]),
    TableModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule { }
