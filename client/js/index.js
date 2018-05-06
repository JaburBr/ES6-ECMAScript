var campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];

console.log(campos);

var tb = document.querySelector('#tabela');

document.querySelector('.form').addEventListener('submit', function(event){

    event.preventDefault();

    var tr = document.createElement('tr');

    campos.forEach(function(campo){

        var td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);

    });

    var td = document.createElement('td');
    td.textContent = campos[1].value * campos[2].value;

    tr.appendChild(td);

    console.log(tr);

    var tb = document.querySelector('#tabela');
    tb.appendChild(tr);  
    
    limparCampos(campos);

});

function limparCampos(campos){
    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0;
};