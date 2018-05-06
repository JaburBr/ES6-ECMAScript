'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, HttpService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            _export('HttpService', HttpService = function () {
                function HttpService() {
                    _classCallCheck(this, HttpService);
                }

                _createClass(HttpService, [{
                    key: '_handleErrors',
                    value: function _handleErrors(res) {
                        if (!res.ok) throw new Error(res.statusText);
                        return res;
                    }
                }, {
                    key: 'get',
                    value: function get(url) {
                        var _this = this;

                        return fetch(url).then(function (res) {
                            return _this._handleErrors(res);
                        }).then(function (res) {
                            return res.json();
                        });

                        /*
                        return new Promise( (resolve, reject) => {
                             let xhr = new XMLHttpRequest();
                                 xhr.open('GET', url);
                                 xhr.onreadystatechange = () => {
                                /*
                                0 - Requisicao ainda nao iniciada 
                                1 - Conexao com o servidor estabelecida
                                2 - Requisicao recebida
                                3 - Processando requisicao
                                4 - Requisicao concluida
                                *                
                                if (xhr.readyState == 4) {
                                         if (xhr.status == 200) {
                                            resolve(JSON.parse(xhr.responseText).map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor)));                        
                                        
                                    } else {
                                                                
                                        reject(xhr.responseText);
                                    };
                                };
                            };
                                 xhr.send();
                             
                         });
                        */
                    }
                }, {
                    key: 'post',
                    value: function post(url, dado) {
                        var _this2 = this;

                        return fetch(url, {
                            headers: { 'content-type': 'application/json' },
                            method: 'post',
                            body: JSON.stringify(dado)
                        }).then(function (res) {
                            return _this2._handleErrors(res);
                        }).then(function (res) {
                            return res;
                        });
                    }
                }]);

                return HttpService;
            }());

            _export('HttpService', HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map