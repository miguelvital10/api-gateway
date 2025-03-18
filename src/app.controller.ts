import { Body, Controller, Get, Logger, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from  '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Observable } from 'rxjs';

@Controller('api/v1')
export class AppController {

  private logger = new Logger(AppController.name)

  private clientAdminBackend: ClientProxy

  
  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@172.16.11.13:5673/smartranking'],
        queue: 'admin-backend'
      }
    })
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
    return this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto)
  }

  @Get('categorias')
  consultarCategorias(@Query('idCategoria') _id: string): Observable<any> {
      return this.clientAdminBackend.send('consultar-categorias', _id ? _id : '')
  }
}
