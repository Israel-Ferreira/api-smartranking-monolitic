import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
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
        return this.jogadores.find((jg) => jg.id === id);
    }

    async getJogadorByEmail(email: string) {
        this.logger.log(`Email: ${email}`);
        return this.jogadores.find((jg) => jg.email === email);
    }

    async addNewJogador(jogadorDTO: CriarJogadorDTO) {
        this.logger.log(jogadorDTO);
        await this.criarJogador(jogadorDTO);
    }

    async updateJogador(id: string, jogadorDTO: CriarJogadorDTO) {
        const currentPlayer = await this.getJogador(id);

        const currentIndex = this.jogadores.findIndex((elem) => {
            return elem.id === id;
        });

        if (!currentPlayer) {
            throw new HttpException(
                'Erro: Jogador Não encontrado',
                HttpStatus.NOT_FOUND
            );
        }

        const update = { ...currentPlayer, ...jogadorDTO };

        this.jogadores[currentIndex] = update;
    }

    private async criarJogador(jogadorDTO: CriarJogadorDTO): Promise<void> {
        const player: Jogador = await this.getJogadorByEmail(jogadorDTO.email);

        if (player) {
            throw new HttpException(
                'Erro: Jogador já existente',
                HttpStatus.BAD_REQUEST
            );
        }

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
