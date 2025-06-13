import { Controller, Get, Post, Param, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './reservation.entity';

@Controller('reservations')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) { }

    // Get all reservations
    @Get()
    findAll() {
        return this.reservationService.findAllActiveReservations();
    }

    // Get a single reservation by ID
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.reservationService.findOneByReservaionId(id);
    }

    // Create a new reservation
    @Post()
    create(@Body() dto: CreateReservationDto) {
        return this.reservationService.createReservation(dto);
    }

    // Update the isServed status of a reservation
    @Patch(':id')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('isServed') isServed: boolean,
    ) {
        return this.reservationService.updateStatus(id, isServed);
    }

    // Delete a reservation
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.reservationService.remove(id);
    }
}
