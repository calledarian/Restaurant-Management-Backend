import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Reservation, CreateReservationDto } from './reservation.entity';
import { Table } from 'src/table/table.entity';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepo: Repository<Reservation>,

        @InjectRepository(Table)
        private tableRepo: Repository<Table>,
    ) { }

    findAllActiveReservations(): Promise<Reservation[]> {

        return this.reservationRepo.find({ where: { isServed: false }, relations: ['table'] });
    }

    async findOneByReservaionId(id: number): Promise<Reservation> {
        const reservation = await this.reservationRepo.findOne({ where: { id }, relations: ['table'] });
        if (!reservation) throw new NotFoundException('Reservation not found');
        return reservation;
    }

    // Create new reservation
    async createReservation(dto: CreateReservationDto): Promise<Reservation> {
        if (dto.isServed === true) {
            throw new BadRequestException('New reservation cannot be already served');
        }

        const table = await this.tableRepo.findOne({ where: { id: dto.tableId } });
        if (!table) throw new NotFoundException('Table not found');

        if (!table.isAvailable) {
            throw new BadRequestException('Table is not available');
        }

        const reservation = this.reservationRepo.create({
            ...dto,
            table,
        });

        table.isAvailable = false;
        await this.tableRepo.save(table);
        return this.reservationRepo.save(reservation);
    }

    async updateStatus(id: number, isServed: boolean): Promise<Reservation> {
        const reservation = await this.reservationRepo.findOne({
            where: { id },
            relations: ['table'],
        });

        if (!reservation) throw new NotFoundException('Reservation not found');

        if (reservation.isServed && isServed === false) {
            throw new BadRequestException('Cannot unserve a reservation');
        }


        reservation.isServed = isServed;

        if (isServed) {
            reservation.table.isAvailable = true;
        }


        await this.tableRepo.save(reservation.table);
        return this.reservationRepo.save(reservation);
    }

    async remove(id: number): Promise<void> {
        const reservation = await this.reservationRepo.findOne({ where: { id }, relations: ['table'] });

        if (!reservation) throw new NotFoundException('Reservation not found');

        if (!reservation.isServed && reservation.table) {
            reservation.table.isAvailable = true;
            await this.tableRepo.save(reservation.table);
        }

        await this.reservationRepo.remove(reservation);
    }

}
