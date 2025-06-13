import { Controller, Get, Post, Param, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto, Reservation, ReservationStatus } from './reservation.entity';
import { Table } from 'src/table/table.entity';

@Controller('/reservations')
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

    @Get('available')
    async availableReservations(): Promise<Table[]> {
        return this.reservationService.availableReservations();
    }


    @Post()
    createReservation(@Body() reservationInfo: CreateReservationDto): Promise<Reservation> {
        return this.reservationService.createReservation(reservationInfo);
    }

    @Patch(':id/status')
    async updateReservationStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status') status: ReservationStatus,
    ) {
        return await this.reservationService.updateReservationStatus(id, status);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.reservationService.remove(Number(id));
    }
}
