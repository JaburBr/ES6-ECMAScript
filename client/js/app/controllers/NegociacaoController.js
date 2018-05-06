"use strict";

System.register(["../views/NegociacoesView", "../model/ListaNegociacoes", "../views/MensagemView", "../model/Mensagem", "../services/NegociacaoService", "../helpers/DateHelper", "../model/Negociacao", "../helpers/Bind"], function (_export, _context) {
    "use strict";

    var NegociacoesView, ListaNegociacoes, MensagemView, Mensagem, NegociacaoService, DateHelper, Negociacao, Bind, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_modelListaNegociacoes) {
            ListaNegociacoes = _modelListaNegociacoes.ListaNegociacoes;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_modelMensagem) {
            Mensagem = _modelMensagem.Mensagem;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_modelNegociacao) {
            Negociacao = _modelNegociacao.Negociacao;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');

                    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

                    this._mensagemView = new MensagemView($('#mensagemView'));
                    this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto');

                    this._negociacaoService = new NegociacaoService();

                    this._ordemAtual = '';

                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: "_init",
                    value: function _init() {
                        var _this = this;

                        this._consultaNegociacoes();
                        setInterval(function () {
                            return _this.importaNegociacoes();
                        }, 60000);
                    }
                }, {
                    key: "adiciona",
                    value: function adiciona(event) {
                        var _this2 = this;

                        event.preventDefault();

                        var negociacao = this._criaNegociacao();

                        this._negociacaoService.cadastrar(negociacao).then(function (mensagem) {
                            _this2._listaNegociacoes.adiciona(negociacao);
                            _this2._mensagem.texto = mensagem;
                            _this2._limpaFormulario();
                        }).catch(function (error) {
                            return _this2._mensagem.texto = error;
                        });
                        //this._consultaNegociacoes();       
                    }
                }, {
                    key: "importaNegociacoes",
                    value: function importaNegociacoes() {
                        var _this3 = this;

                        this._negociacaoService.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                            negociacoes.forEach(function (negociacao) {
                                _this3._listaNegociacoes.adiciona(negociacao);
                                _this3._mensagem.texto = 'Negociacoes do periodo Importada';
                            });
                        }).catch(function (error) {
                            return _this3._mensagem.texto = error;
                        });
                    }
                }, {
                    key: "_criaNegociacao",
                    value: function _criaNegociacao() {

                        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: "apaga",
                    value: function apaga() {
                        var _this4 = this;

                        this._negociacaoService.apaga().then(function (msg) {
                            _this4._listaNegociacoes.esvazia();
                            _this4._mensagem.texto = msg;
                        }).catch(function (error) {
                            return _this4._mensagem.texto = error;
                        });
                    }
                }, {
                    key: "_limpaFormulario",
                    value: function _limpaFormulario() {

                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;
                        this._inputData.focus();
                    }
                }, {
                    key: "_consultaNegociacoes",
                    value: function _consultaNegociacoes() {
                        var _this5 = this;

                        this._negociacaoService.lista().then(function (negociacoes) {
                            return negociacoes.map(function (item) {
                                return _this5._listaNegociacoes.adiciona(item);
                            });
                        }).catch(function (error) {
                            return _this5._mensagem = error;
                        });
                    }
                }, {
                    key: "ordena",
                    value: function ordena(coluna) {

                        if (this._ordemAtual == coluna) {

                            this._listaNegociacoes.inverteOrdem();
                        } else {

                            this._listaNegociacoes.ordena(function (p, s) {
                                return p[coluna] - s[coluna];
                            });
                        }
                        this._ordemAtual = coluna;
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
            function currentInstance() {
                return negociacaoController;
            }

            _export("currentInstance", currentInstance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map