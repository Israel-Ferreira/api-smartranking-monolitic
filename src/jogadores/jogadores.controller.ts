import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import CriarJogadorDTO from './dto/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
    @Post()
    async criarJogador(@Body() jogador: CriarJogadorDTO) {
        console.log(`${jogador.nome}`);
        return await JSON.stringify({ ...jogador });
    }

    @Put(':id')
    async atualizarJogador(@Param() params) {
        return await JSON.stringify({ nome: 'Israel', id: params.id });
    }
}
