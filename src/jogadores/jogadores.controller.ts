import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import CriarJogadorDTO from './dto/criar-jogador.dto';
import Jogador from './models/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(private jogadoresService: JogadoresService) {}

    @Get()
    async listJogadores(): Promise<Jogador[]> {
        return await this.jogadoresService.getJogadores();
    }

    @Get('/search')
    async searchJogadorByEmail(
        @Query('email') email: string
    ): Promise<Jogador> {
        return await this.jogadoresService.getJogadorByEmail(email);
    }

    @Post()
    async criarJogador(@Body() jogador: CriarJogadorDTO): Promise<void> {
        await this.jogadoresService.addNewJogador(jogador);
    }

    @Get('/:id')
    async getJogador(@Param('id') id): Promise<Jogador> {
        console.log(id);
        return this.jogadoresService.getJogador(id);
    }

    @Put(':id')
    async atualizarJogador(
        @Param('id') id,
        @Body() jogadorDto: CriarJogadorDTO
    ): Promise<void> {
        return await this.jogadoresService.updateJogador(id, jogadorDto);
    }
}
