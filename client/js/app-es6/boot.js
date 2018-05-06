import { currentInstance } from "./controllers/NegociacaoController";
import {  } from "./polyfill/fetch";

let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('#btnImporta').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
document.querySelector('#btnApaga').onclick = negociacaoController.apaga.bind(negociacaoController);