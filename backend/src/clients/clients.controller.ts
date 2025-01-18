import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { IsPublic } from '.././auth/decorators/is-public.decorator';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { SwaggerResponses } from './swagger/responses.swagger';

@Controller('clients')
@ApiBearerAuth()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse(SwaggerResponses.clientCreated)
  @ApiResponse(SwaggerResponses.emailAlreadyExists)
  @ApiResponse(SwaggerResponses.cpfAlreadyExists)
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Create a client using an invitation' })
  @ApiResponse(SwaggerResponses.clientCreated)
  @ApiResponse(SwaggerResponses.emailAlreadyExists)
  @ApiResponse(SwaggerResponses.cpfAlreadyExists)
  @ApiResponse(SwaggerResponses.invitationNotFound)
  @ApiParam({ name: 'id', type: String, description: 'Invitation ID' })
  @IsPublic()
  @Post('/register/:id')
  createByInvite(
    @Param('id') id: string,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientsService.createByInvite(id, createClientDto);
  }

  @ApiOperation({ summary: 'Retrieve paginated clients' })
  @ApiResponse(SwaggerResponses.clientsRetrieved)
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @HttpCode(HttpStatus.OK)
  @Get()
  getPaginatedClients(@Query() paginationDto: PaginationDto) {
    return this.clientsService.getPaginatedClients(
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @ApiOperation({ summary: 'Retrieve a client by ID' })
  @ApiResponse(SwaggerResponses.clientFound)
  @ApiResponse(SwaggerResponses.clientNotFound)
  @ApiParam({ name: 'id', type: String, description: 'Client ID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a client' })
  @ApiResponse(SwaggerResponses.clientUpdated)
  @ApiResponse(SwaggerResponses.clientNotFound)
  @ApiResponse(SwaggerResponses.emailAlreadyExists)
  @ApiResponse(SwaggerResponses.cpfAlreadyExists)
  @ApiParam({ name: 'id', type: String, description: 'Client ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @ApiOperation({ summary: 'Delete a client' })
  @ApiResponse(SwaggerResponses.clientRemoved)
  @ApiResponse(SwaggerResponses.clientNotFound)
  @ApiParam({ name: 'id', type: String, description: 'Client ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
