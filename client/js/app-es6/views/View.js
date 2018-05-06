export class View {

    constructor(elemento){

        this._elemento = elemento;
    }

    template(){

        return new Error('A funcao template deve ser implementada');
    }

    update(model){

        this._elemento.innerHTML = this.template(model);
    }

}