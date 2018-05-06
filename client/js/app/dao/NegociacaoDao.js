'use strict';

System.register(['../model/Negociacao'], function (_export, _context) {
    "use strict";

    var Negociacao, _createClass, NegociacaoDao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelNegociacao) {
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

            _export('NegociacaoDao', NegociacaoDao = function () {
                function NegociacaoDao(connection) {
                    _classCallCheck(this, NegociacaoDao);

                    this._connection = connection;
                    this._store = 'negociacoes';
                }

                _createClass(NegociacaoDao, [{
                    key: 'adiciona',
                    value: function adiciona(negociacao) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

                            request.onsuccess = function (e) {

                                resolve();
                            };

                            request.onerror = function (e) {

                                console.log(e.target.error);
                                reject('Nao foi possivel adicionar a negociacao.');
                            };
                        });
                    }
                }, {
                    key: 'listaTodos',
                    value: function listaTodos() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {

                            var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

                            var negociacoes = [];

                            cursor.onsuccess = function (e) {

                                var atual = e.target.result;

                                if (atual) {

                                    var dado = atual.value;

                                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                                    atual.continue();
                                } else {
                                    //console.log(negociacoes);
                                    resolve(negociacoes);
                                }
                            };

                            cursor.onerror = function (e) {

                                console.log(e.target.error.name);
                                reject('Nao foi possivel listar as negociacoes');
                            };
                        });
                    }
                }, {
                    key: 'apagaTodos',
                    value: function apagaTodos() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                            request.onsuccess = function (e) {
                                resolve('Negociacoes removidas com sucesso');
                            };

                            request.onerror = function (e) {
                                console.log(e.target.error);
                                reject('Nao foi possivel remover as negociacoes');
                            };
                        });
                    }
                }]);

                return NegociacaoDao;
            }());

            _export('NegociacaoDao', NegociacaoDao);
        }
    };
});
//# sourceMappingURL=NegociacaoDao.js.map