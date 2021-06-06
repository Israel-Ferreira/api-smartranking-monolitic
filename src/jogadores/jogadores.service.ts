import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

import CriarJogadorDTO from './dto/criar-jogador.dto';
import Jogador from './models/jogador.interface';

@Injectable()
export class JogadoresService {
    private logger: Logger = new Logger(JogadoresService.name);
    private jogadores: Jogador[] = [];

    async getJogadores() {
        return await this.jogadores;
    }

    async getJogador(id: string) {
        this.logger.log(this.jogadores);
        return await this.jogadores.filter((jg) => jg.id === id)[0];
    }

    async addNewJogador(jogadorDTO: CriarJogadorDTO) {
        this.logger.log(jogadorDTO);
        this.criarJogador(jogadorDTO);
    }

    private criarJogador(jogadorDTO: CriarJogadorDTO): void {
        const jogador: Jogador = {
            id: uuidV4(),
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'http://www.google.com.br/foto123.jpg',
            ...jogadorDTO,
        };

        this.jogadores.push(jogador);
    }
}
