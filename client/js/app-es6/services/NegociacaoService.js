import { HttpService } from "./HttpService";
import { ConnectionFactory } from "./ConnectionFactory";
import { NegociacaoDao } from "../dao/NegociacaoDao";
import { Negociacao } from "../model/Negociacao";

export class NegociacaoService {

    constructor() {
        this._httpService = new HttpService();
    }

    obterNegociacoes() {

        return new Promise((resolve, reject) => {

            Promise.all([this.obterNegociacaoDaSemana(),
            this.obterNegociacaoDaSemanaAnterior(),
            this.obterNegociacaoDaSemanaRetrasada()])
                .then(negociacoes => {
                    resolve(negociacoes.reduce((arrayReduzido, array) => arrayReduzido.concat(array), []))
                })
                .catch(error => reject(error));
        });
    }

    obterNegociacaoDaSemana() {

        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/semana')
                .then((json) => {
                    resolve(json.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor)));
                })
                .catch(error => {
                    console.log(error);
                    reject('Nao foi possivel obter as negociacoes da semana.');
                });
        });
    }

    obterNegociacaoDaSemanaAnterior() {

        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/anterior')
                .then((json) => {
                    resolve(json.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor)));
                })
                .catch(error => {
                    console.log(error);
                    reject('Nao foi possivel obter as negociacoes da semana anterior.');
                });
        });
    }

    obterNegociacaoDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/retrasada')
                .then((json) => {
                    resolve(json.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor)));
                })
                .catch(error => {
                    console.log(error);
                    reject('Nao foi possivel obter as negociacoes da semana retrasada.');
                });
        });
    }

    cadastrar(negociacao) {

        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociacao adicionada com sucesso.')
            .catch((error) => {
                console.log(error);
                throw new Error('Nao foi possivel cadastrar a negociacao.')
            });

    }

    lista() {

        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => negociacoes)
            .catch((error) => {
                console.log(error);
                throw new Error('Nao foi possivel listar as negociacoes.')
            });

    }

    apaga() {

        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => mensagem)
            .catch((error) => {
                console.log(error);
                throw new Error('Nao foi possivel apagar as negociacoes.')
            });
    }

    importa(listaAtual) {

        return this.obterNegociacoes()
            .then(negociacoes => negociacoes.filter(negociacao =>
                !listaAtual.some(negociacaoExistente =>
                    JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))))
            .catch((error) => {
                console.log(error);
                throw new Error('Nao foi possivel listar as negociacoes.')
            });
    }

}