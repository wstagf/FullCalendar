every.controller('configuracaoCidadesController', function ($scope, $http, usuarioAPI) {
    $scope.Cidade = {
        id: 0,
        descricao: ''
    };
    $scope.CidadeAdd = {
        id: 0,
        descricao: ''
    };

    $scope.lstCidade = true;
    $scope.addCidade = false;
    $scope.updtCidade = false;
    $scope.lstCidadeCarregada = false;
    $scope.indiceAtualizar = 0;

    $scope.showEditarCidade = function () {
        $scope.addCidade = false;
        $scope.lstCidade = false;
        $scope.updtCidade = true;
    };

    $scope.showAddCidade = function () {
        $scope.addCidade = true;
        $scope.lstCidade = false;
        $scope.updtCidade = false;

        $scope.CidadeAdd = {
            id: 0,
            descricao: ''
        };
    };
    $scope.showListCidade = function () {
        $scope.addCidade = false;
        $scope.lstCidade = true;
        $scope.updtCidade = false;
    };


    $scope.inserirCidade = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.descricao = $scope.CidadeAdd.descricao;
        parametros.idEstado = $scope.idEstadoSelecionado;
        $http.post(base + 'cidade/insert', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao adicionar cidade  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.CidadeAdd = {
                        descricao: '',
                        versao: 0,
                    };
                    toastr.success('Cidade cadastrado com sucesso!', 'Sucesso');
                    $scope.showListCidade();
                    $scope.listarCidades($scope.idEstadoSelecionado);
                }
            })
            .error(function (data) {
                toastr.error('Falha em adicionar cidade', 'Erro');

            });
    }

    $scope.listaCidades = {};
    $scope.listarCidades = function (id_estado) {
        $scope.listaCidades = {};
        var parametros = usuarioAPI.getUsuario();
        parametros.orderBy = 'id';
        parametros.direction = 'asc';
        parametros.idEstado = id_estado
        $http.post(base + 'cidade/viewbystate', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Não foram encontrados registos  <br/>' + data.errors[0][0].message, 'Informação');
                    $scope.lstCidadeCarregada = true;
                } else {
                    $scope.listaCidades = data.data.view;
                    $scope.lstCidadeCarregada = true;
                }
            })
            .error(function (data) {
                toastr.error('Erro ao localizar cidade', 'Erro');
            });
    };

    $scope.editarCidade = function (indexCidade) {
        $scope.indiceAtualizar = indexCidade;
        $scope.Cidade = $scope.listaCidades[indexCidade];
        $scope.showEditarCidade();
    };


    $scope.excluirCidade = function (indexCidade) {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.listaCidades[indexCidade].id;
        $http.post(base + 'cidade/delete', parametros)
           .success(function (data) {
               if (data.reason != "success") {
                   toastr.info('Erro ao tentar excluir a cidade  <br/>' + data.errors[0][0].message, 'Informação');
               } else {
                   $scope.listaCidades.splice([indexCidade], 1);
                   $scope.showListCidade();
                   toastr.success('Cidade apagada com sucesso', 'Sucesso');
               }
           })
           .error(function (data) {
               toastr.error('Falha em excluir cidade', 'Erro');
           });
    };


    $scope.alterarCidade = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.Cidade.id;
        parametros.descricao = $scope.Cidade.descricao;
        parametros.idEstado = $scope.Cidade.id_estado;
        $http.post(base + 'cidade/update', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao tentar atualizar a cidade  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaCidades[$scope.indiceAtualizar].descricao = parametros.descricao;
                    $scope.showListCidade();
                    toastr.success('Cidade atualizada!', 'Sucesso');
                }
                console.log(data);
            })
            .error(function (data) {
                toastr.error('Falha em salvar Cidade', 'Erro');
            });
    };



    $scope.paisSelecionado = false;

    $scope.idEstadoSelecionado = 0;

    $scope.filtrarCidadePorPais = function () {
        $scope.listarCidades();
        
    }

    $scope.selecionarPais = function() {
        $scope.paisSelecionado = true;
    }

    $scope.resetDropDown = function () {
        console.log('limpar Cidade');
        if (angular.isDefined($scope.idPaisSelecionado)) {
            delete $scope.idPaisSelecionado;
            $scope.paisSelecionado = false;
            $scope.lstEstadoCarregada = false;
        }
    }

    $scope.todasCidades = {};

    $scope.listarTodasCidades = function () {
        var parametros = usuarioAPI.getUsuario();
        $http.post(base + 'cidade/view', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao tentar localizar todas as cidades  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.todasCidades = data.data.view;
                }
            })
            .error(function (data) {
                toastr.error('Falha em localizar as cidades', 'Erro');
            });
    };

    $scope.listarTodasCidades();

});
