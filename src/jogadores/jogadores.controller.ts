import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

    @Post()
    async criarJogador(@Body() jogador: CriarJogadorDTO): Promise<void> {
        await this.jogadoresService.addNewJogador(jogador);
    }

    @Get('/:id')
    async getJogador(@Param('id') id): Promise<Jogador> {
        console.log(id);
        return this.jogadoresService.getJogador(id)
    }

    @Put(':id')
    async atualizarJogador(@Param() params) {
        return await JSON.stringify({ nome: 'Israel', id: params.id });
    }
}
