import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Observable } from 'rxjs';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';

@Controller('api/v1')
export class CategoriasController {

  private logger = new Logger(CategoriasController.name)
  
  constructor(
    private clientProxySmartRanking : ClientProxySmartRanking
  ) {}

  private clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance()

  @Post('categorias')
  @UsePipes(ValidationPipe)
  criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
    return this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto)
  }

  @Get('categorias')
  consultarCategorias(@Query('idCategoria') _id: string): Observable<any> {
      return this.clientAdminBackend.send('consultar-categorias', _id ? _id : '')
  }

  @Put('categorias/:_id')
  @UsePipes(ValidationPipe)
  atualizarCategorias(@Body() atualizarCategoriaDto :AtualizarCategoriaDto, @Param('_id') _id: string) {
      return this.clientAdminBackend.emit('atualizar-categoria', {id: _id  , categoria: atualizarCategoriaDto})
  }
}
