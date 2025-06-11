import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto, Reservation, ReservationStatus } from './reservation.entity';
import { Table } from 'src/table/table.entity';

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

    async create(data: CreateReservationDto): Promise<Reservation> {
        const table = await this.tableRepository.findOne({ where: { id: data.tableId } });
        if (!table) {
            throw new NotFoundException(`Table ${data.tableId} not found`);
        }

        const reservation = this.reservationRepository.create({
            table,
            partySize: data.partySize,
            startTime: data.startTime,
            endTime: data.endTime,
            status: data.status || ReservationStatus.PENDING,
            note: data.note,
            reservedBy: data.reservedBy,
        });

        return this.reservationRepository.save(reservation);
    }


    async update(id: number, updateData: Partial<Reservation>): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne({ where: { id } });
        if (!reservation) {
            throw new NotFoundException(`Reservation ${id} not found`);
        }

        if (updateData.table && typeof updateData.table === 'number') {
            const table = await this.tableRepository.findOne({ where: { id: updateData.table } });
            if (!table) {
                throw new NotFoundException(`Table ${updateData.table} not found`);
            }
            reservation.table = table;
        }

        Object.assign(reservation, updateData);
        return this.reservationRepository.save(reservation);
    }

    async remove(id: number): Promise<void> {
        const result = await this.reservationRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Reservation ${id} not found`);
        }
    }
}
