var teste = {};

every.controller('configuracaoEstadosController', function ($scope, $http, usuarioAPI) {
    $scope.Estado = {
        id: 0,
        descricao: ''
    };
    $scope.EstadoAdd = {
        id: 0,
        descricao: ''
    };

    $scope.lstEstado = true;
    $scope.addEstado = false;
    $scope.updtEstado = false;
    $scope.lstEstadoCarregada = false;
    $scope.indiceAtualizar = 0;

    $scope.showEditarEstado = function () {
        $scope.addEstado = false;
        $scope.lstEstado = false;
        $scope.updtEstado = true;
    };
    $scope.showAddEstado = function () {
        $scope.addEstado = true;
        $scope.lstEstado = false;
        $scope.updtEstado = false;

        $scope.EstadoAdd = {
            id: 0,
            descricao: ''
        };
    };
    $scope.showListEstado = function () {
        $scope.addEstado = false;
        $scope.lstEstado = true;
        $scope.updtEstado = false;
    };


    $scope.inserirEstado = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.descricao = $scope.EstadoAdd.descricao;
        parametros.idPais = $scope.idPaisSelecionado;
        $http.post(base + 'estado/insert', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao adicionar estado  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.EstadoAdd = {
                        descricao: '',
                        versao: 0,
                    };
                    toastr.success('Estado cadastrado com sucesso!', 'Sucesso');
                    $scope.showListEstado();
                    $scope.listarEstados();
                }               
            })
            .error(function (data) {
                toastr.error('Falha em adicionar estado', 'Erro');
                
            });
    }

    $scope.listaEstados = {};
    $scope.listarEstados = function () {
        $scope.paisSelecionado = true;
        $scope.listaEstados = {};
        var parametros = usuarioAPI.getUsuario();
        parametros.orderBy = 'id';
        parametros.direction = 'asc';
        parametros.idPais = $scope.idPaisSelecionado;
        $http.post(base + 'estado/viewbycountry', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Não foram encontrados registos  <br/>' + data.errors[0][0].message, 'Informação');
                    $scope.lstEstadoCarregada = true;
                } else {
                    $scope.listaEstados = data.data.view;
                    $scope.lstEstadoCarregada = true;
                }
            })
            .error(function (data) {
                toastr.error('Erro ao localizar estado', 'Erro');
            });
    };

    $scope.editarEstado = function (indexEstado) {
        $scope.indiceAtualizar = indexEstado;
        $scope.Estado = $scope.listaEstados[indexEstado];
        $scope.showEditarEstado();
    };


    $scope.excluirEstado = function (indexEstado) {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.listaEstados[indexEstado].id;
        $http.post(base + 'estado/delete', parametros)
           .success(function (data) {
               if (data.reason != "success") {
                   console.log(data);
                   teste = data;
                   toastr.info('Erro ao tentar excluir o estado <br/>' + data.errors[0][0].message, 'Informação');
               } else {
                   $scope.listaEstados.splice([indexEstado], 1);
                   $scope.showListEstado();
                   toastr.success('Estado apagado com sucesso', 'Sucesso');
               }
           })
           .error(function (data) {
               toastr.error('Falha em excluir estado', 'Erro');
           });
    };


    $scope.alterarEstado = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.Estado.id;
        parametros.descricao = $scope.Estado.descricao;
         parametros.idPais = $scope.idPaisSelecionado;
        $http.post(base + 'estado/update', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao tentar atualizar o estado <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaEstados[$scope.indiceAtualizar].descricao = parametros.descricao;
                    $scope.showListEstado();
                    toastr.success('Estado atualizado!', 'Sucesso');
                }
                console.log(data);
            })
            .error(function (data) {
                toastr.error('Falha em salvar estado', 'Erro');
            });
    };

   

    $scope.paisSelecionado = false;

    $scope.idPaisSelecionado = 0;



});
