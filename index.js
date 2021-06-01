$(document).ready(function() {
  
//   $('#table').DataTable({
//     "processing" : true,
//     "ajax" : {
//       'url': "https://60afe4991f26610017ffd79f.mockapi.io/api/v1/clientes/",
//         dataSrc : ''
//     },
//     "columns" : [ {
//         "data" : "ID"
//     }, {
//         "data" : "NOME"
//     }, {
//         "data" : "USUARIO"
//     }]
// });

   $.ajax({
    'url': "https://60afe4991f26610017ffd79f.mockapi.io/api/v1/clientes/",
    'method': "GET",
    'contentType': 'application/json'
    }).done( function(data) {
      var table = $('#table').DataTable({
        searching: false,
        select: true,
        "aaData": data,
        "columns": [
              { "data": "Id" },
              { "data": "codigo" },
              { "data": "nome" },
              { "data": "nome_fantasia" },
              { "data": "cep" },
              { "data": "endereco" },
              { "data": "bairro" },
              { "data": "localidade" },
              { "data": "uf" },
              { "data": "data" },
              { "data": "cnpj" },
          ]
      });   
      
      $('#table tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
      } );

      $('#updateRow').click( function () {
      debugger
        alert(table.rows('.selected').data())
      });

    $('#delRow').click( function () {
      debugger
      let url = 'https://60afe4991f26610017ffd79f.mockapi.io/api/v1/clientes/'+table.rows('.selected').data()[0].Id
      api('DELETE',url)
      table.ajax.reload();
    });
      
    })
} );

function api(type,url,data){ 
  return $.ajax({
    async:false,
    type: type,
    url: url,
    data: data
  });
};

async function buscaCep(cep){
  debugger
  try{
     const res = await api('GET','https://viacep.com.br/ws/'+cep+'/json/')
     
      $('#endereco').val(res.logradouro)
      $('#endereco').prop('readonly', true)
      $('#bairro').val(res.bairro)
      $('#bairro').prop('readonly', true)
      $('#localidade').val(res.localidade)
      $('#localidade').prop('readonly', true)
      $('#uf').val(res.uf)
      $('#uf').prop('readonly', true)
  } catch(err) {
     console.log('error');
   }
}

async function postClients(){
  let nome = $('#nome').val()
  let nomeFantasia = $('#nomeFantasia').val()
  let cep = $('#cep').val()
  let endereco = $('#endereco').val()
  let bairro = $('#bairro').val()
  let localidade = $('#localidade').val()
  let uf = $('#uf').val()

  let data = {
    'codigo':'123',
    nome,
    nomeFantasia,
    cep,
    bairro,
    localidade,
    uf,
    "data": "2021-05-31T13:35:52.450Z",
    endereco,
  }

  try{
    const res = await api('POST','https://60afe4991f26610017ffd79f.mockapi.io/api/v1/clientes',data)
    table.ajax.reload();
 } catch(err) {
    console.log('error');
  }


  
}

function clearInputs(){
  $('#nome').val('')
  $('#nomeFantasia').val('')
  $('#cep').val('')
  $('#endereco').val('')
  $('#bairro').val('')
  $('#localidade').val('')
  $('#uf').val('')

  $('#endereco').prop('readonly', false)
  $('#bairro').prop('readonly', false)
  $('#localidade').prop('readonly', false)
  $('#uf').prop('readonly', false)
}
