import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateSessionDto, UpdateSessionDto } from "./session.entity";
import { SessionService } from "./session.service";

@Controller('sessions')
export class SessionController {
    constructor(private readonly sessionService: SessionService) { }

    @Post()
    create(@Body() createSessionDto: CreateSessionDto) {
        return this.sessionService.create(createSessionDto);
    }

    @Get()
    findAll() {
        return this.sessionService.findAll();
    }

    @Get('active')
    getActiveSessions() {
        return this.sessionService.getActiveSessions();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.sessionService.findOne(id);
    }

    @Patch(':id')
    patchAsComplete(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSessionDto: UpdateSessionDto,
    ) {
        return this.sessionService.patchAsComplete(id, updateSessionDto);
    }
}