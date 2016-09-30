every.controller('configuracaoEstiloBaladaController', function ($scope, $http, usuarioAPI) {
    $scope.EstiloBalada = {
        id: 0,
        descricao: ''
    };
    $scope.EstiloBaladaAdd = {
        id: 0,
        descricao: ''
    };

    $scope.lstEstiloBalada = true;
    $scope.addEstiloBalada = false;
    $scope.updtEstiloBalada = false;
    $scope.lstEstiloBaladaCarregada = false;
    $scope.indiceAtualizar = 0;

    $scope.showEditarEstiloBalada = function () {
        $scope.addEstiloBalada = false;
        $scope.lstEstiloBalada = false;
        $scope.updtEstiloBalada = true;
    };
    $scope.showAddEstiloBalada = function () {
        $scope.addEstiloBalada = true;
        $scope.lstEstiloBalada = false;
        $scope.updtEstiloBalada = false;

        $scope.EstiloBaladaAdd = {
            id: 0,
            descricao: ''
        };
    };
    $scope.showListEstiloBalada = function () {
        $scope.addEstiloBalada = false;
        $scope.lstEstiloBalada = true;
        $scope.updtEstiloBalada = false;
    };


    $scope.inserirEstiloBalada = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.descricao = $scope.EstiloBaladaAdd.descricao;
        $http.post(base + 'estilo/insert', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao adicionar estilo  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.EstiloBaladaAdd = {
                        descricao: '',
                        versao: 0,
                    };
                    toastr.success('Estilo cadastrado com sucesso!', 'Sucesso');
                    $scope.showListEstiloBalada();
                    $scope.listarEstiloBaladas();
                }               
            })
            .error(function (data) {
                toastr.error('Falha em adicionar estilo', 'Erro');
                
            });
    }

    $scope.listaEstiloBaladas = {};
    $scope.listarEstiloBaladas = function () {
        $scope.listaEstiloBaladas = {};
        var parametros = usuarioAPI.getUsuario();
        parametros.orderBy = 'id';
        parametros.direction = 'asc';
        $http.post(base + 'estilo/view', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Não foram encontrados registos  <br/>' + data.errors[0][0].message, 'Informação');
                    $scope.lstEstiloBaladaCarregada = true;
                } else {
                    $scope.listaEstiloBaladas = data.data.view;
                    $scope.lstEstiloBaladaCarregada = true;
                }
            })
            .error(function (data) {
                toastr.error('Erro ao localizar estilo', 'Erro');
            });
    };

    $scope.editarEstiloBalada = function (indexEstiloBalada) {
        $scope.indiceAtualizar = indexEstiloBalada;
        $scope.EstiloBalada = $scope.listaEstiloBaladas[indexEstiloBalada];
        $scope.showEditarEstiloBalada();
    };


    $scope.excluirEstiloBalada = function (indexEstiloBalada) {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.listaEstiloBaladas[indexEstiloBalada].id;
        $http.post(base + 'estilo/delete', parametros)
           .success(function (data) {
               console.log(data);
               if (data.reason != "success") {
                   toastr.info('Erro ao tentar excluir o estilo  <br/>' + data.errors[0][0].message, 'Informação');
               } else {
                   $scope.listaEstiloBaladas.splice([indexEstiloBalada], 1);
                   $scope.showListEstiloBalada();
                   toastr.success('Estilo apagado com sucesso', 'Sucesso');
               }
           })
           .error(function (data) {
               toastr.error('Falha em excluir estilo', 'Erro');
           });
    };

    

    $scope.mudarAba = function (aba) {
        console.log(aba)
    };


    $scope.alterarEstiloBalada = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.EstiloBalada.id;
        parametros.descricao = $scope.EstiloBalada.descricao;

        $http.post(base + 'estilo/update', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao tentar atualizar o estilo  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaEstiloBaladas[$scope.indiceAtualizar].descricao = parametros.descricao;
                    $scope.showListEstiloBalada();
                    toastr.success('Estilo atualizado!', 'Sucesso');
                }
                console.log(data);
            })
            .error(function (data) {
                toastr.error('Falha em salvar estilo', 'Erro');
            });
    };

    $scope.listarEstiloBaladas();
   
});
