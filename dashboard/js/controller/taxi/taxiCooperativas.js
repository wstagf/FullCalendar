every.controller('taxiCooperativasController', function ($scope, $http, usuarioAPI, filterFilter) {
    $scope.Cooperativa = {
        id: 0,
        nome: '',
        endereco: '',
        telefone: '',
        contato: '',
        telefone_contato: '',
        id_cidade: 0,
        cidade: {
            id: 0,
            nome: ''
        },
        listaBaladas: []
    };

    $scope.CooperativaAdd = {
        id: 0,
        nome: '',
        endereco: '',
        telefone: '',
        contato: '',
        telefone_contato: '',
        id_cidade: 0,
        cidade: {
            id: 0,
            nome: ''
        },
        listaBaladas: []
    };

    $scope.lstCooperativa = true;
    $scope.addCooperativa = false;
    $scope.updtCooperativa = false;
    $scope.lstCooperativaCarregada = false;
    $scope.indiceAtualizar = 0;

    $scope.showEditarCooperativa = function () {
        $scope.addCooperativa = false;
        $scope.lstCooperativa = false;
        $scope.updtCooperativa = true;
    };
    $scope.showAddCooperativa = function () {
        $scope.addCooperativa = true;
        $scope.lstCooperativa = false;
        $scope.updtCooperativa = false;

        $scope.CooperativaAdd = {
            id: 0,
            nome: '',
            endereco: '',
            telefone: '',
            contato: '',
            telefone_contato: '',
            id_cidade: 0,
            cidade: {
                id: 0,
                nome: ''
            },
            listaBaladas: []
        };

        $scope.listaBaladasPorCidade = {};
    };


    $scope.showListCooperativa = function () {
        $scope.addCooperativa = false;
        $scope.lstCooperativa = true;
        $scope.updtCooperativa = false;

        $scope.listaCooperativas = {};
        $scope.listarCooperativas();
    };


    $scope.inserirCooperativa = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.nome = $scope.CooperativaAdd.nome;
        parametros.telefone = $scope.CooperativaAdd.telefone;
        parametros.endereco = $scope.CooperativaAdd.endereco;
        parametros.contato = $scope.CooperativaAdd.contato;
        parametros.telefoneContato = $scope.CooperativaAdd.telefone_contato;
        parametros.id_cidade = $scope.CooperativaAdd.idCidade;
        if ($scope.CooperativaAdd.listaBaladas) {
            parametros.idBalada = $scope.CooperativaAdd.listaBaladas.join();
        };

        $http.post(base + 'cooperativa/insert', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao adicionar cooperativa  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    toastr.success('Cooperativa cadastrado com sucesso!', 'Sucesso');
                    $scope.showListCooperativa();
                    $scope.listarCooperativas();
                }               
            })
            .error(function (data) {
                toastr.error('Falha em adicionar coopertavia', 'Erro');
            });
    }

    $scope.listaCooperativas = {};
    $scope.listarCooperativas = function () {
        $scope.listaCooperativas = {};
        var parametros = usuarioAPI.getUsuario();
        parametros.orderBy = 'id';
        parametros.direction = 'asc';
        $http.post(base + 'cooperativa/view', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Não foram encontrados registos  <br/>' + data.errors[0][0].message, 'Informação');
                    $scope.lstCooperativaCarregada = true;
                } else {
                    $scope.listaCooperativas = data.data.view;
                    $scope.lstCooperativaCarregada = true;
                }
            })
            .error(function (data) {
                toastr.error('Erro ao localizar estilo', 'Erro');
            });
    };

    $scope.editarCooperativa = function (indexCooperativa) {
        $scope.Cooperativa = $scope.listaCooperativas[indexCooperativa];
        $scope.listarBaladasPorCidade($scope.Cooperativa.id_cidade);
        $scope.indiceAtualizar = indexCooperativa;
        $scope.showEditarCooperativa();
    };


    $scope.excluirCooperativa = function (indexCooperativa) {

        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.listaCooperativas[indexCooperativa].id;
        $http.post(base + 'cooperativa/delete', parametros)
           .success(function (data) {
               if (data.reason != "success") {
                   toastr.info('Erro ao tentar excluir a cooperativa  <br/>' + data.errors[0][0].message, 'Informação');
               } else {
                   $scope.showListCooperativa();
                   toastr.success('Cooperativa apagado com sucesso', 'Sucesso');
               }
           })
           .error(function (data) {
               toastr.error('Falha em excluir cooperativa', 'Erro');
           });
    };

    $scope.baladasEscolhidas = [];
    $scope.alterarCooperativa = function () {
        $scope.Cooperativa.baladas_atendidas = [];
        
        $scope.listaBaladasPorCidade.map(
            function (balada) {
                if (balada.selected) {
                    if (!($scope.Cooperativa.baladas_atendidas.contains(balada.id))) {
                        $scope.Cooperativa.baladas_atendidas.push(balada.id)
                    }
                }
            }
        );
        
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.Cooperativa.id;
        parametros.nome = $scope.Cooperativa.nome;
        parametros.telefone = $scope.Cooperativa.telefone;
        parametros.endereco = $scope.Cooperativa.endereco;
        parametros.contato = $scope.Cooperativa.contato;
        parametros.telefoneContato = $scope.Cooperativa.telefone_contato;
        parametros.idCidade = $scope.Cooperativa.id_cidade;
        parametros.idBalada = $scope.Cooperativa.baladas_atendidas.join();
        $http.post(base + 'cooperativa/update', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao tentar atualizar a cooperativa  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.showListCooperativa();
                    toastr.success('Cooperativa atualizado!', 'Sucesso');
                }
            })
            .error(function (data) {
                toastr.error('Falha em salvar cooperativa', 'Erro');
            });
    };

    $scope.listarCooperativas();

    $scope.cidadeEscolhida = {};
    $scope.listaBaladasPorCidadeCarregada = false;

    $scope.listaBaladasPorCidade = {};
    $scope.listarBaladasPorCidade = function (idCidade) {
        $scope.listaBaladasPorCidade = {};
        var parametros = usuarioAPI.getUsuario();
        parametros.orderBy = 'nome';
        parametros.direction = 'asc';
        parametros.idCidade = idCidade;
        $http.post(base + 'balada/viewbycity', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Não foram encontrados registos  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaBaladasPorCidade = data.data.view;
                    $scope.listaBaladasPorCidadeCarregada = true;

                    if ($scope.updtCooperativa) {
                        $scope.Cooperativa.baladas_atendidas.map(function(balada) {
                             $scope.listaBaladasPorCidade.map(function(baladaCidade) {
                                if (balada == baladaCidade.id) {
                                    baladaCidade.selected = true;
                                }
                             })
                        })
                   } 

                }
            })
            .error(function (data) {
                toastr.error('Erro ao localizar baladas', 'Erro');
            });
    };


    
   
});
