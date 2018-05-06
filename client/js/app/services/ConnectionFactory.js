'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, stores, version, banco, connection, close, ConnectionFactory;

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

            stores = ['negociacoes'];
            version = 3;
            banco = 'aluraframe';
            connection = null;
            close = null;

            _export('ConnectionFactory', ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw 'Nao e possivel criar instancias de ConnectionFactory';
                }

                _createClass(ConnectionFactory, [{
                    key: '_createStores',
                    value: function _createStores(connection) {

                        stores.forEach(function (store) {

                            if (connection.objectStoreNames.contains(store)) {

                                connection.deleteObjectStore(store);
                                console.log('ObjectStore ' + store + ' deletada.');
                            }

                            connection.createObjectStore(store, { autoIncrement: true });
                        });
                    }
                }], [{
                    key: 'getConnection',
                    value: function getConnection(objectStore) {

                        return new Promise(function (resolve, reject) {

                            //var conection;
                            var openRequest = window.indexedDB.open(banco, version);

                            openRequest.onupgradeneeded = function (e) {

                                ConnectionFactory._createStores(e.target.result);
                            };

                            openRequest.onsuccess = function (e) {

                                console.log('Conexao obtida com sucesso.');
                                if (!connection) {

                                    connection = e.target.result;

                                    close = connection.close.bind(connection);

                                    connection.close = function () {
                                        throw new Error('Voce nao pode fechar a conexao.');
                                    };
                                }
                                resolve(connection);
                            };

                            openRequest.onerror = function (e) {

                                console.log(e.target.error);
                                reject(console.log(e.target.error.name));
                            };
                        });
                    }
                }, {
                    key: 'closeConnection',
                    value: function closeConnection() {

                        if (connection) {
                            close;
                            connection = null;
                        }
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map