import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto, Session, UpdateSessionDto } from '../session/session.entity';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,
    ) { }

    async findAll(): Promise<Session[]> {
        return this.sessionRepository.find({
            relations: ['orderItems.menuItem'],
        });
    }

    async findOne(id: number): Promise<Session> {
        const session = await this.sessionRepository.findOne({
            where: { id },
            relations: ['orderItems.menuItem'],
        });
        if (!session) {
            throw new NotFoundException(`Session with ID ${id} not found`);
        }
        return session;
    }

    async create(createSessionDto: CreateSessionDto): Promise<Session> {
        const session = this.sessionRepository.create({
            ...createSessionDto,
            isCompleted: false,
        });
        return this.sessionRepository.save(session);
    }

    async patchAsComplete(id: number, updateSessionDto: UpdateSessionDto): Promise<Session> {
        await this.findOne(id);
        await this.sessionRepository.update(id, updateSessionDto);
        return this.findOne(id);
    }

    async getActiveSessions(): Promise<any[]> {
        const sessions = await this.sessionRepository.find({
            where: { isCompleted: false },
            relations: ['orderItems', 'orderItems.menuItem'],
        });

        return sessions.map((session) => ({
            id: session.id,
            tableId: session.tableId,
            partySize: session.partySize,
            createdAt: session.createdAt,
            items: session.orderItems.map((item) => ({
                name: item.menuItem.name,
                quantity: item.quantity,
            })),
        }));
    }


}