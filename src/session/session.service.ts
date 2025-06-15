import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto, Session } from '../session/session.entity';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,
    ) { }

    async findAll(): Promise<Session[]> {
        return this.sessionRepository.find({
            relations: ['table', 'orderItems', 'orderItems.menuItem'],
        });
    }

    async findOne(id: number): Promise<Session> {
        const session = await this.sessionRepository.findOne({
            where: { id },
            relations: ['table', 'orderItems', 'orderItems.menuItem'],
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

    async update(id: number, updateSessionDto: CreateSessionDto): Promise<Session> {
        await this.findOne(id);
        await this.sessionRepository.update(id, updateSessionDto);
        return this.findOne(id);
    }

    async getActiveSessions(): Promise<Session[]> {
        return this.sessionRepository.find({
            where: { isCompleted: false },
            relations: ['table', 'orderItems', 'orderItems.menuItem'],
        });
    }
}