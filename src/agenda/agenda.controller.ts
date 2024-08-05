import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile, Query, UseGuards } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { Agenda } from 'src/entities/agenda.entity';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadOptions, getFileUrl } from 'src/lib/file-upload.util';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { QueryDto } from 'src/lib/query.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@Controller('agendas')
@ApiTags('agendas')
export class AgendaController {
    constructor(private readonly agendaService: AgendaService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post(':userId')
    @UseInterceptors(FileInterceptor('file', fileUploadOptions('agendas')))
    @ApiOperation({ summary: 'Create a new Agenda' })
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            required: ['file', 'title', 'date'], // Adjust according to required fields
            properties: {
                title: {
                    type: 'string',
                    format: 'text',
                    description: 'Title of the agenda',
                    example: 'Meeting with stakeholders',
                },
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'File upload for agenda image',
                    example: 'file.jpg',
                },
                date: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Date of the agenda',
                    example: '2024-08-05T14:30:00.000Z',
                },
                location: {
                    type: 'string',
                    format: 'text',
                    description: 'Location of the agenda',
                    example: 'Conference Room A',
                },
                time: {
                    type: 'string',
                    format: 'text',
                    description: 'Time of the agenda',
                    example: '10:00',
                },
                author: {
                    type: 'string',
                    format: 'text',
                    description: 'Author of the agenda',
                    example: 'Admin',
                },
                body: {
                    type: 'string',
                    format: 'text',
                    description: 'Body of the agenda',
                    example: 'Detailed description of the agenda...',
                },
            },
        },
    })
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createAgendaDto: CreateAgendaDto,
    ): Promise<Agenda> {
        const imgSrc = getFileUrl('agendas', file);
        return this.agendaService.create(createAgendaDto,  imgSrc);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Agendas' })
    @ApiResponse({ status: 200, description: 'Returns all Agendas' })
    async findAll(@Query() query: QueryDto): Promise<{ data: Agenda[], total: number }> {
        return this.agendaService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an Agenda by ID' })
    @ApiParam({ name: 'id', description: 'Agenda ID' })
    @ApiResponse({ status: 200, description: 'Returns the Agenda' })
    async findOne(@Param('id') id: string): Promise<Agenda> {
        return this.agendaService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put(':id/:userId')
    @UseInterceptors(FileInterceptor('file', fileUploadOptions('agendas')))
    @ApiOperation({ summary: 'Update an Agenda by ID' })
    @ApiParam({ name: 'id', description: 'Agenda ID' })
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    format: 'text',
                    description: 'Title of the agenda',
                    example: 'Updated meeting with stakeholders',
                },
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'File upload for agenda image',
                    example: 'file.jpg',
                },
                date: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Date of the agenda',
                    example: '2024-08-05T14:30:00.000Z',
                },
                location: {
                    type: 'string',
                    format: 'text',
                    description: 'Location of the agenda',
                    example: 'Conference Room B',
                },
                time: {
                    type: 'string',
                    format: 'text',
                    description: 'Time of the agenda',
                    example: '11:00',
                },
                author: {
                    type: 'string',
                    format: 'text',
                    description: 'Author of the agenda',
                    example: 'Admin',
                },
                body: {
                    type: 'string',
                    format: 'text',
                    description: 'Body of the agenda',
                    example: 'Updated description of the agenda...',
                },
            },
        },
    })
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() updateAgendaDto: UpdateAgendaDto,
    ): Promise<Agenda> {
        const imgSrc = getFileUrl('agendas', file);
        return this.agendaService.update(id,  updateAgendaDto, imgSrc);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an Agenda by ID' })
    @ApiParam({ name: 'id', description: 'Agenda ID' })
    @ApiBearerAuth()
    @ApiResponse({ status: 204, description: 'Agenda successfully deleted' })
    async remove(@Param('id') id: string): Promise<void> {
        return this.agendaService.remove(id);
    }
}
