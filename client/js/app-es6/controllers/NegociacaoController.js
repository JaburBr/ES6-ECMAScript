import { NegociacoesView } from "../views/NegociacoesView";
import { ListaNegociacoes } from "../model/ListaNegociacoes";
import { MensagemView } from "../views/MensagemView";
import { Mensagem } from "../model/Mensagem";
import { NegociacaoService } from "../services/NegociacaoService";
import { DateHelper } from "../helpers/DateHelper";
import { Negociacao } from "../model/Negociacao";
import { Bind } from "../helpers/Bind";


class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto')

        this._negociacaoService = new NegociacaoService();

        this._ordemAtual = ''

        this._init();
    }

    _init() {

        this._consultaNegociacoes();
        setInterval(() => this.importaNegociacoes(), 60000);
    }

    adiciona(event) {

        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._negociacaoService.cadastrar(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(error => this._mensagem.texto = error);
        //this._consultaNegociacoes();       
    }

    importaNegociacoes() {

        this._negociacaoService.importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adiciona(negociacao);
                    this._mensagem.texto = 'Negociacoes do periodo Importada';
                });
            })
            .catch(error => this._mensagem.texto = error);
    }

    _criaNegociacao() {

        return new Negociacao(DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));
    }

    apaga() {

        this._negociacaoService.apaga()
            .then(msg => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = msg;
            })
            .catch(error => this._mensagem.texto = error)
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    _consultaNegociacoes() {

        this._negociacaoService.lista()
            .then(negociacoes => negociacoes.map(item => this._listaNegociacoes.adiciona(item)))
            .catch(error => this._mensagem = error)

    }

    ordena(coluna) {
        
        if(this._ordemAtual == coluna) {            

            this._listaNegociacoes.inverteOrdem(); 
        } else {            
            
            this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);    
        }
        this._ordemAtual = coluna;    
    }
}

let negociacaoController = new NegociacaoController();

export function currentInstance(){
    return negociacaoController;
}