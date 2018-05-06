"use strict";

System.register(["./HttpService", "./ConnectionFactory", "../dao/NegociacaoDao", "../model/Negociacao"], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
        }, function (_modelNegociacao) {
            Negociacao = _modelNegociacao.Negociacao;
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

            _export("NegociacaoService", NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._httpService = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: "obterNegociacoes",
                    value: function obterNegociacoes() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            Promise.all([_this.obterNegociacaoDaSemana(), _this.obterNegociacaoDaSemanaAnterior(), _this.obterNegociacaoDaSemanaRetrasada()]).then(function (negociacoes) {
                                resolve(negociacoes.reduce(function (arrayReduzido, array) {
                                    return arrayReduzido.concat(array);
                                }, []));
                            }).catch(function (error) {
                                return reject(error);
                            });
                        });
                    }
                }, {
                    key: "obterNegociacaoDaSemana",
                    value: function obterNegociacaoDaSemana() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2._httpService.get('negociacoes/semana').then(function (json) {
                                resolve(json.map(function (item) {
                                    return new Negociacao(new Date(item.data), item.quantidade, item.valor);
                                }));
                            }).catch(function (error) {
                                console.log(error);
                                reject('Nao foi possivel obter as negociacoes da semana.');
                            });
                        });
                    }
                }, {
                    key: "obterNegociacaoDaSemanaAnterior",
                    value: function obterNegociacaoDaSemanaAnterior() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            _this3._httpService.get('negociacoes/anterior').then(function (json) {
                                resolve(json.map(function (item) {
                                    return new Negociacao(new Date(item.data), item.quantidade, item.valor);
                                }));
                            }).catch(function (error) {
                                console.log(error);
                                reject('Nao foi possivel obter as negociacoes da semana anterior.');
                            });
                        });
                    }
                }, {
                    key: "obterNegociacaoDaSemanaRetrasada",
                    value: function obterNegociacaoDaSemanaRetrasada() {
                        var _this4 = this;

                        return new Promise(function (resolve, reject) {
                            _this4._httpService.get('negociacoes/retrasada').then(function (json) {
                                resolve(json.map(function (item) {
                                    return new Negociacao(new Date(item.data), item.quantidade, item.valor);
                                }));
                            }).catch(function (error) {
                                console.log(error);
                                reject('Nao foi possivel obter as negociacoes da semana retrasada.');
                            });
                        });
                    }
                }, {
                    key: "cadastrar",
                    value: function cadastrar(negociacao) {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return 'Negociacao adicionada com sucesso.';
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Nao foi possivel cadastrar a negociacao.');
                        });
                    }
                }, {
                    key: "lista",
                    value: function lista() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.listaTodos();
                        }).then(function (negociacoes) {
                            return negociacoes;
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Nao foi possivel listar as negociacoes.');
                        });
                    }
                }, {
                    key: "apaga",
                    value: function apaga() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.apagaTodos();
                        }).then(function (mensagem) {
                            return mensagem;
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Nao foi possivel apagar as negociacoes.');
                        });
                    }
                }, {
                    key: "importa",
                    value: function importa(listaAtual) {

                        return this.obterNegociacoes().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !listaAtual.some(function (negociacaoExistente) {
                                    return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                                });
                            });
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Nao foi possivel listar as negociacoes.');
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export("NegociacaoService", NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map