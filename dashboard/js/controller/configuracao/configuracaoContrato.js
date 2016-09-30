var a = '';
every.controller('configuracaoContratoController', function ($scope, $http, usuarioAPI) {
    $scope.Contrato = {
        id: 0,
        descritivo: '',
        versao: '',
    };
    $scope.ContratoAdd = {
        id: 0,
        descritivo: '',
        versao: '',
    };
    $scope.lstContrato = true;
    $scope.addContrato = false;
    $scope.updtContrato = false;
    $scope.lstContratoCarregada = false;
    $scope.indiceAtualizar = 0;

    $scope.showEditarContrato = function () {
        $scope.addContrato = false;
        $scope.lstContrato = false;
        $scope.updtContrato = true;
    };
    $scope.showAddContrato = function () {
        $scope.addContrato = true;
        $scope.lstContrato = false;
        $scope.updtContrato = false;

        $scope.ContratoAdd = {
            id: 0,
            descritivo: '',
            versao: '',
            data_versao: ''
        };
    };
    $scope.showListContrato = function () {
        $scope.addContrato = false;
        $scope.lstContrato = true;
        $scope.updtContrato = false;
    };


    $scope.inserirContrato = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.descritivo = $scope.ContratoAdd.descritivo;
        parametros.versao = $scope.ContratoAdd.versao;
        $http.post(base + 'contrato/insert', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao adicionar contrato  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.ContratoAdd = {
                        descritivo: '',
                        versao: 0,
                    };
                    toastr.success('Contrato cadastrado com sucesso!', 'Sucesso');
                    $scope.showListContrato();
                    $scope.listarContratos();
                }               
            })
            .error(function (data) {
                toastr.error('Falha em adicionar contrato', 'Erro');
                
            });
    }

    $scope.listaContratos = {};
    $scope.listarContratos = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.orderBy = 'id';
        parametros.direction = 'desc';
        $http.post(base + 'contrato/view', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Não foram encontrados registos  <br/>' + data.errors[0][0].message, 'Informação');
                    $scope.lstContratoCarregada = true;
                } else {
                    $scope.listaContratos = data.data.view;
                    $scope.lstContratoCarregada = true;
                }
            })
            .error(function (data) {
                toastr.error('Erro ao localizar contratos', 'Erro');
            });
    };

    $scope.editarContrato = function (indexContrato) {
        $scope.indiceAtualizar = indexContrato;
        $scope.Contrato = $scope.listaContratos[indexContrato]
        console.log($scope.Contrato);
        $scope.showEditarContrato();
    };


    $scope.excluirContrato = function (indexContrato) {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.listaContratos[indexContrato].id;

        $http.post(base + 'contrato/delete', parametros)
           .success(function (data) {
               if (data.reason != "success") {
                   toastr.info('Erro ao tentar excluir o contrato  <br/>' + data.errors[0][0].message, 'Informação');
               } else {
                   $scope.listaContratos.splice([indexContrato], 1);
                   $scope.showListContrato();
                   toastr.success('Contrato apagado com sucesso', 'Sucesso');
               }
           })
           .error(function (data) {
               toastr.error('Falha em excluir contrato', 'Erro');
           });
    };

    $scope.alterarContrato = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.id = $scope.Contrato.id;
        parametros.versao = $scope.Contrato.versao;
        parametros.descritivo = $scope.Contrato.descritivo;

        
        $http.post(base + 'contrato/update', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao tentar atualizar o contrato  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaContratos[$scope.indiceAtualizar].descritivo = parametros.descritivo;
                    $scope.showListContrato();
                    toastr.success('Contrato atualizado!', 'Sucesso');
                }
                console.log(data);
            })
            .error(function (data) {
                toastr.error('Falha em salvar contrato', 'Erro');
            });
    };

    $scope.listarContratos();
});
