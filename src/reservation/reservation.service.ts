import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { CreateReservationDto, Reservation, ReservationStatus } from './reservation.entity';
import { Table, TableStatus } from 'src/table/table.entity';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,

        @InjectRepository(Table)
        private tableRepository: Repository<Table>,
    ) { }

    findAll(): Promise<Reservation[]> {
        return this.reservationRepository.find();
    }

    async findOne(id: number): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne({ where: { id } });
        if (!reservation) {
            throw new NotFoundException(`Reservation ${id} not found`);
        }
        return reservation;
    }

    async availableReservations(): Promise<Table[]> {
        const activeReservations = await this.reservationRepository.find({
            where: { status: ReservationStatus.PENDING },
            relations: ['table'],
        });

        // Safely extract table IDs
        const reservedTableIds = activeReservations
            .map(reservation => reservation.table?.id)
            .filter((id): id is number => typeof id === 'number' && !isNaN(id));

        return this.tableRepository.find({
            where: reservedTableIds.length
                ? { id: Not(In(reservedTableIds)) }
                : {}, // if no reserved tables, return all
        });
    }

    async createReservation(dto: CreateReservationDto): Promise<Reservation> {
        // Find the table by its ID
        const table = await this.tableRepository.findOne({ where: { table_id: dto.table_id } });

        if (!table) {
            throw new NotFoundException('Table not found');
        }

        // Set the table status based on reservation status
        if (dto.status === ReservationStatus.COMPLETED) {
            table.status = TableStatus.AVAILABLE;
        } else {
            table.status = TableStatus.RESERVED;
        }

        // Save the updated table status
        await this.tableRepository.save(table);

        // Create and save the reservation
        const reservation = this.reservationRepository.create({
            ...dto,
            table,
        });

        return await this.reservationRepository.save(reservation);
    }


    async updateReservationStatus(id: number, status: ReservationStatus): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
            relations: ['table'],
        });

        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }

        reservation.status = status;

        if (status === ReservationStatus.COMPLETED) {
            reservation.table.status = TableStatus.AVAILABLE;
        } else {
            reservation.table.status = TableStatus.RESERVED;
        }

        await this.tableRepository.save(reservation.table);
        return await this.reservationRepository.save(reservation);
    }


    async remove(id: number): Promise<void> {
        const result = await this.reservationRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Reservation ${id} not found`);
        }
    }
}
