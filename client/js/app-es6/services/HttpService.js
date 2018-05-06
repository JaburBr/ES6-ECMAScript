export class HttpService{

    _handleErrors(res){
        if (!res.ok) throw new Error(res.statusText);
        return res;
    }

    get (url){
       
        return fetch(url)
                .then(res => this._handleErrors(res))
                .then(res => res.json());


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

    post(url, dado){

        return fetch(url, {
                    headers: {'content-type' : 'application/json'},
                    method: 'post',
                    body: JSON.stringify(dado)
                })
                .then(res => this._handleErrors(res))
                .then(res => res);


    }

}