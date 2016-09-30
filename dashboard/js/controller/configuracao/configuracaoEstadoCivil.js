var a = '';
every.controller('configuracaoEstadoCivilController', function ($scope, $http, usuarioAPI) {
    $scope.EstadoCivil = {
        id: 0,
        descricao: ''
    };
    $scope.EstadoCivilAdd = {
        id: 0,
        descricao: ''
    };

    $scope.lstEstadoCivil = true;
    $scope.addEstadoCivil = false;
    $scope.updtEstadoCivil = false;
    $scope.lstEstadoCivilCarregada = false;
    $scope.indiceAtualizar = 0;

    $scope.showEditarEstadoCivil = function () {
        $scope.addEstadoCivil = false;
        $scope.lstEstadoCivil = false;
        $scope.updtEstadoCivil = true;
    };
    $scope.showAddEstadoCivil = function () {
        $scope.addEstadoCivil = true;
        $scope.lstEstadoCivil = false;
        $scope.updtEstadoCivil = false;

        $scope.EstadoCivilAdd = {
            id: 0,
            descricao: ''
        };
    };
    $scope.showListEstadoCivil = function () {
        $scope.addEstadoCivil = false;
        $scope.lstEstadoCivil = true;
        $scope.updtEstadoCivil = false;
    };


    $scope.inserirEstadoCivil = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.descricao = $scope.EstadoCivilAdd.descricao;
        parametros.versao = $scope.EstadoCivilAdd.versao;
        $http.post(base + 'estadocivil/insert', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao adicionar estado civil  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.EstadoCivilAdd = {
                        descricao: '',
                        versao: 0,
                    };
                    toastr.success('Estado civil cadastrado com sucesso!', 'Sucesso');
                    $scope.showListEstadoCivil();
                    $scope.listarEstadoCivils();
                }               
            })
            .error(function (data) {
                toastr.error('Falha em adicionar estado civil', 'Erro');
                
            });
    }

    $scope.listaEstadoCivils = {};
    $scope.listarEstadoCivils = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.orderBy = 'id';
        parametros.direction = 'asc';
        $http.post(base + 'estadocivil/view', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Não foram encontrados registos  <br/>' + data.errors[0][0].message, 'Informação');
                    $scope.lstEstadoCivilCarregada = true;
                } else {
                    $scope.listaEstadoCivils = data.data.view;
                    $scope.lstEstadoCivilCarregada = true;
                }
            })
            .error(function (data) {
                toastr.error('Erro ao localizar estado civil', 'Erro');
            });
    };

    $scope.editarEstadoCivil = function (indexEstadoCivil) {
        $scope.indiceAtualizar = indexEstadoCivil;
        $scope.EstadoCivil = $scope.listaEstadoCivils[indexEstadoCivil]
        console.log($scope.EstadoCivil);
        $scope.showEditarEstadoCivil();
    };


    $scope.excluirEstadoCivil = function (indexEstadoCivil) {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.listaEstadoCivils[indexEstadoCivil].id;

        $http.post(base + 'estadocivil/delete', parametros)
           .success(function (data) {
               if (data.reason != "success") {
                   toastr.info('Erro ao tentar excluir o estado civil  <br/>' + data.errors[0][0].message, 'Informação');
               } else {
                   $scope.listaEstadoCivils.splice([indexEstadoCivil], 1);
                   $scope.showListEstadoCivil();
                   toastr.success('Estado civil apagado com sucesso', 'Sucesso');
               }
           })
           .error(function (data) {
               toastr.error('Falha em excluir estado civil', 'Erro');
           });
    };

    $scope.alterarEstadoCivil = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.EstadoCivil.id;
        parametros.versao = $scope.EstadoCivil.versao;
        parametros.descricao = $scope.EstadoCivil.descricao;

        $http.post(base + 'estadocivil/update', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao tentar atualizar o estado civil  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaEstadoCivils[$scope.indiceAtualizar].descricao = parametros.descricao;
                    $scope.showListEstadoCivil();
                    toastr.success('Estado civil atualizado!', 'Sucesso');
                }
                console.log(data);
            })
            .error(function (data) {
                toastr.error('Falha em salvar estado civil', 'Erro');
            });
    };

    $scope.listarEstadoCivils();
});
