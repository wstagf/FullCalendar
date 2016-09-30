every.controller('configuracaoOrientacaoSexualController', function ($scope, $http, usuarioAPI) {
    $scope.OrientacaoSexual = {
        id: 0,
        descricao: ''
    };
    $scope.OrientacaoSexualAdd = {
        id: 0,
        descricao: ''
    };

    $scope.lstOrientacaoSexual = true;
    $scope.addOrientacaoSexual = false;
    $scope.updtOrientacaoSexual = false;
    $scope.lstOrientacaoSexualCarregada = false;
    $scope.indiceAtualizar = 0;

    $scope.showEditarOrientacaoSexual = function () {
        $scope.addOrientacaoSexual = false;
        $scope.lstOrientacaoSexual = false;
        $scope.updtOrientacaoSexual = true;
    };
    $scope.showAddOrientacaoSexual = function () {
        $scope.addOrientacaoSexual = true;
        $scope.lstOrientacaoSexual = false;
        $scope.updtOrientacaoSexual = false;

        $scope.OrientacaoSexualAdd = {
            id: 0,
            descricao: ''
        };
    };
    $scope.showListOrientacaoSexual = function () {
        $scope.addOrientacaoSexual = false;
        $scope.lstOrientacaoSexual = true;
        $scope.updtOrientacaoSexual = false;
    };


    $scope.inserirOrientacaoSexual = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.descricao = $scope.OrientacaoSexualAdd.descricao;
        parametros.versao = $scope.OrientacaoSexualAdd.versao;
        $http.post(base + 'orientacaosexual/insert', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao adicionar orientação sexual  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.OrientacaoSexualAdd = {
                        descricao: '',
                        versao: 0,
                    };
                    toastr.success('Orientação sexual cadastrado com sucesso!', 'Sucesso');
                    $scope.showListOrientacaoSexual();
                    $scope.listarOrientacaoSexuals();
                }               
            })
            .error(function (data) {
                toastr.error('Falha em adicionar orientação sexual', 'Erro');
                
            });
    }

    $scope.listaOrientacaoSexuals = {};
    $scope.listarOrientacaoSexuals = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.orderBy = 'id';
        parametros.direction = 'asc';
        $http.post(base + 'orientacaosexual/view', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Não foram encontrados registos  <br/>' + data.errors[0][0].message, 'Informação');
                    $scope.lstOrientacaoSexualCarregada = true;
                } else {
                    $scope.listaOrientacaoSexuals = data.data.view;
                    $scope.lstOrientacaoSexualCarregada = true;
                }
            })
            .error(function (data) {
                toastr.error('Erro ao localizar orientação sexual', 'Erro');
            });
    };

    $scope.editarOrientacaoSexual = function (indexOrientacaoSexual) {
        $scope.indiceAtualizar = indexOrientacaoSexual;
        $scope.OrientacaoSexual = $scope.listaOrientacaoSexuals[indexOrientacaoSexual]
        console.log($scope.OrientacaoSexual);
        $scope.showEditarOrientacaoSexual();
    };


    $scope.excluirOrientacaoSexual = function (indexOrientacaoSexual) {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.listaOrientacaoSexuals[indexOrientacaoSexual].id;

        $http.post(base + 'orientacaosexual/delete', parametros)
           .success(function (data) {
               if (data.reason != "success") {
                   toastr.info('Erro ao tentar excluir o orientação sexual  <br/>' + data.errors[0][0].message, 'Informação');
               } else {
                   $scope.listaOrientacaoSexuals.splice([indexOrientacaoSexual], 1);
                   $scope.showListOrientacaoSexual();
                   toastr.success('Orientação sexual apagado com sucesso', 'Sucesso');
               }
           })
           .error(function (data) {
               toastr.error('Falha em excluir estado civil', 'Erro');
           });
    };

    $scope.alterarOrientacaoSexual = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.OrientacaoSexual.id;
        parametros.versao = $scope.OrientacaoSexual.versao;
        parametros.descricao = $scope.OrientacaoSexual.descricao;

        $http.post(base + 'orientacaosexual/update', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao tentar atualizar o orientação sexual  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaOrientacaoSexuals[$scope.indiceAtualizar].descricao = parametros.descricao;
                    $scope.showListOrientacaoSexual();
                    toastr.success('Orientação sexual atualizado!', 'Sucesso');
                }
                console.log(data);
            })
            .error(function (data) {
                toastr.error('Falha em salvar estado civil', 'Erro');
            });
    };

    $scope.listarOrientacaoSexuals();
});
