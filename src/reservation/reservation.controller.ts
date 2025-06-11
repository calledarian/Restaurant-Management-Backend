import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto, Reservation } from './reservation.entity';

@Controller('reservations')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) { }

    @Get()
    findAll(): Promise<Reservation[]> {
        return this.reservationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Reservation> {
        return this.reservationService.findOne(Number(id));
    }

    @Post()
    create(@Body() reservationInfo: CreateReservationDto): Promise<Reservation> {
        return this.reservationService.create(reservationInfo);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() reservationInfo: Partial<Reservation>,
    ): Promise<Reservation> {
        return this.reservationService.update(Number(id), reservationInfo);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.reservationService.remove(Number(id));
    }
}
