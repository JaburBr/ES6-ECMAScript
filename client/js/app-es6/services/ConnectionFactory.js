const stores = ['negociacoes'];
const version = 3;
const banco = 'aluraframe';

let connection = null;
let close = null;

export class ConnectionFactory {

    constructor() {
        throw ('Nao e possivel criar instancias de ConnectionFactory');
    }

    static getConnection(objectStore) {

        return new Promise((resolve, reject) => {

            //var conection;
            var openRequest = window.indexedDB.open(banco, version);

            openRequest.onupgradeneeded = e => {

                ConnectionFactory._createStores(e.target.result);
            }

            openRequest.onsuccess = e => {

                console.log('Conexao obtida com sucesso.');
                if (!connection) {

                    connection = e.target.result;

                    close = connection.close.bind(connection);

                    connection.close = () => { throw new Error('Voce nao pode fechar a conexao.') };

                }
                resolve(connection);
            }

            openRequest.onerror = e => {

                console.log(e.target.error)
                reject(console.log(e.target.error.name));
            }


        });

    };

    _createStores(connection) {

        stores.forEach(store => {

            if (connection.objectStoreNames.contains(store)) {

                connection.deleteObjectStore(store);
                console.log('ObjectStore ' + store + ' deletada.');
            }

            connection.createObjectStore(store, { autoIncrement: true });
        });
    }

    static closeConnection() {

        if (connection) {
            close;
            connection = null;
        }
    }
}


