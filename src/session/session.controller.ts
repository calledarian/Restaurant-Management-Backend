import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateSessionDto, UpdateSessionDto, Session } from "./session.entity";
import { SessionService } from "./session.service";

@ApiTags('sessions')
@Controller('sessions')
export class SessionController {
    constructor(private readonly sessionService: SessionService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new session' })
    @ApiCreatedResponse({ description: 'Session successfully created', type: Session })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    create(@Body() createSessionDto: CreateSessionDto) {
        return this.sessionService.create(createSessionDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all sessions' })
    @ApiResponse({ status: 200, description: 'List of sessions', type: [Session] })
    findAll() {
        return this.sessionService.findAll();
    }

    @Get('active')
    @ApiOperation({ summary: 'Get all active (not completed) sessions' })
    @ApiResponse({ status: 200, description: 'List of active sessions', type: [Session] })
    getActiveSessions() {
        return this.sessionService.getActiveSessions();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get session by ID' })
    @ApiResponse({ status: 200, description: 'The session', type: Session })
    @ApiNotFoundResponse({ description: 'Session not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.sessionService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update session completion status' })
    @ApiResponse({ status: 200, description: 'Updated session', type: Session })
    @ApiNotFoundResponse({ description: 'Session not found' })
    patchAsComplete(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSessionDto: UpdateSessionDto,
    ) {
        return this.sessionService.patchAsComplete(id, updateSessionDto);
    }
}
