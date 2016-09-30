every.controller('configuracaoPaisesController', function ($scope, $http, usuarioAPI) {
    $scope.Pais = {
        id: 0,
        descricao: ''
    };
    $scope.PaisAdd = {
        id: 0,
        descricao: ''
    };

    $scope.lstPais = true;
    $scope.addPais = false;
    $scope.updtPais = false;
    $scope.lstPaisCarregada = false;
    $scope.indiceAtualizar = 0;

    $scope.showEditarPais = function () {
        $scope.addPais = false;
        $scope.lstPais = false;
        $scope.updtPais = true;
    };
    $scope.showAddPais = function () {
        $scope.addPais = true;
        $scope.lstPais = false;
        $scope.updtPais = false;

        $scope.PaisAdd = {
            id: 0,
            descricao: ''
        };
    };
    $scope.showListPais = function () {
        $scope.addPais = false;
        $scope.lstPais = true;
        $scope.updtPais = false;
    };


    $scope.inserirPais = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.descricao = $scope.PaisAdd.descricao;
        console.log(base + 'contrato/update');
        $http.post(base + 'pais/insert', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao adicionar país  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.PaisAdd = {
                        descricao: '',
                        versao: 0,
                    };
                    toastr.success('País cadastrado com sucesso!', 'Sucesso');
                    $scope.showListPais();
                    $scope.listarPaiss();
                }               
            })
            .error(function (data) {
                toastr.error('Falha em adicionar país', 'Erro');
                
            });
    }

    $scope.listaPaiss = {};
    $scope.listarPaiss = function () {
        $scope.listaPaiss = {};
        var parametros = usuarioAPI.getUsuario();
        parametros.orderBy = 'id';
        parametros.direction = 'asc';
        $http.post(base + 'pais/view', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Não foram encontrados registos  <br/>' + data.errors[0][0].message, 'Informação');
                    $scope.lstPaisCarregada = true;
                } else {
                    $scope.listaPaiss = data.data.view;
                    $scope.lstPaisCarregada = true;
                }
            })
            .error(function (data) {
                toastr.error('Erro ao localizar país', 'Erro');
            });
    };

    $scope.editarPais = function (indexPais) {
        $scope.indiceAtualizar = indexPais;
        $scope.Pais = $scope.listaPaiss[indexPais];
        $scope.showEditarPais();
    };


    $scope.excluirPais = function (indexPais) {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.listaPaiss[indexPais].id;
        $http.post(base + 'pais/delete', parametros)
           .success(function (data) {
               if (data.reason != "success") {
                   console.log(data);
                   toastr.info('Erro ao tentar excluir o país ' + data.error[0].message, 'Informação');
               } else {
                   $scope.listaPaiss.splice([indexPais], 1);
                   $scope.showListPais();
                   toastr.success('País apagado com sucesso', 'Sucesso');
               }
           })
           .error(function (data) {
               toastr.error('Falha em excluir país', 'Erro');
           });
    };

    

    $scope.mudarAba = function (aba) {
        console.log(aba)
    };


    $scope.alterarPais = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.Pais.id;
        parametros.descricao = $scope.Pais.descricao;

        $http.post(base + 'pais/update', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao tentar atualizar o país  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaPaiss[$scope.indiceAtualizar].descricao = parametros.descricao;
                    $scope.showListPais();
                    toastr.success('País atualizado!', 'Sucesso');
                }
                console.log(data);
            })
            .error(function (data) {
                toastr.error('Falha em salvar país', 'Erro');
            });
    };

    $scope.listarPaiss();
   
});
