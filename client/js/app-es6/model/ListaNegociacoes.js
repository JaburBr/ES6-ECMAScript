export class ListaNegociacoes{

    constructor(armadilha){
        
        this._negociacoes = [];
        this._armadilha = armadilha;        
    }

    adiciona(negociacao){

        this._negociacoes.push(negociacao);        
        
        //Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    get negociacoes(){

        return [].concat(this._negociacoes);
    }
    
    esvazia(){

        this._negociacoes = [];
        
        //Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    get volumeTotal() {

        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }

    ordena(criterio) {

        this._negociacoes.sort(criterio);        
    }
    
    inverteOrdem() {

        this._negociacoes.reverse();
    }    


}