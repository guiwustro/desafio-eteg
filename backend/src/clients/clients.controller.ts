import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { IsPublic } from '@/auth/decorators/is-public.decorator';
import { PaginationDto } from './dto/pagination.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @IsPublic()
  @Post('/register/:id')
  createByInvite(
    @Param('id') id: string,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientsService.createByInvite(id, createClientDto);
  }

  @Get()
  getPaginatedClients(@Query() paginationDto: PaginationDto) {
    return this.clientsService.getPaginatedClients(
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
