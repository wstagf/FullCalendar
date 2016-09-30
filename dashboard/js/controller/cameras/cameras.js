every.controller('camerasController', function ($scope, $http, usuarioAPI) {
   var parametros = usuarioAPI.getUsuario();

   $scope.Camera = {
        id: 0,
        descricao: '',
    };
    $scope.CameraAdd = {
        id: 0,
        descricao: ''
    };
    $scope.lstCamera = true;
    $scope.addCamera = false;
    $scope.updtCamera = false;
    $scope.lstCameraCarregada = false;
    $scope.indiceAtualizar = 0;

    $scope.showEditarCamera = function () {
        $scope.addCamera = false;
        $scope.lstCamera = false;
        $scope.updtCamera = true;
    };
    $scope.showAddCamera = function () {
        $scope.addCamera = true;
        $scope.lstCamera = false;
        $scope.updtCamera = false;

        $scope.CameraAdd = {
            id: 0,
            descricao: ''
        };
    };
    $scope.showListCamera = function () {
        $scope.addCamera = false;
        $scope.lstCamera = true;
        $scope.updtCamera = false;
    };


    $scope.inserirCamera = function () {
        parametros.idBalada = $scope.$parent.baladaSelecionada.id;
        parametros.nomeCamera = $scope.CameraAdd.nome_Camera;
        parametros.linkCamera = $scope.CameraAdd.link_Camera;

        $http.post(base + 'Cameras/insert', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    console.log(data);
                    toastr.info('Erro ao adicionar música  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.CameraAdd = {
                        descricao: ''
                    };
                    toastr.success('Música cadastrada com sucesso!', 'Sucesso');
                    $scope.showListCamera();
                    $scope.listarCameras();
                }               
            })
            .error(function (data) {
                console.log(data);
                toastr.error('Falha em adicionar música', 'Erro');
            });
    }

    $scope.listaCameras = {};
    $scope.listarCameras = function () {
        parametros.idBalada = $scope.$parent.baladaSelecionada.id;
           $http.post(base  + 'Cameras/view', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    console.log(data);
                    toastr.info('Não foram encontrados registos  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaCameras = data.data.view;
                    $scope.lstCameraCarregada = true;
                }
            })
            .error(function (data) {
                console.log(data);
                toastr.error('Erro ao localizar categorias', 'Erro');
           });
    };

    $scope.editarCamera = function (Camera) {
        $scope.Camera  = Camera
        $scope.showEditarCamera();
    };


    $scope.excluirCamera = function (indexCamera) {
        parametros.idBalada = $scope.$parent.baladaSelecionada.id;
        parametros.id = $scope.listaCameras[indexCamera].id;

        $http.post(base + 'Cameras/delete', parametros)
           .success(function (data) {
               if (data.reason != "success") {
                   toastr.info('Erro ao tentar excluir a música  <br/>' + data.errors[0][0].message, 'Informação');
               } else {
                   $scope.listaCameras.splice([indexCamera], 1);
                   $scope.showListCamera();
                   toastr.success('Música apagada com sucesso', 'Sucesso');
               }
           })
           .error(function (data) {
               toastr.error('Falha em excluir música', 'Erro');
               console.log(data);
           });
    };

    $scope.alterarCamera = function (Camera) {
        parametros.idBalada = $scope.$parent.baladaSelecionada.id;
        parametros.id = $scope.Camera.id;
        parametros.nomeCamera = $scope.Camera.nome_Camera;
        parametros.linkCamera = $scope.Camera.link_Camera;

        $http.post(base + 'Cameras/update', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    console.log(data);
                    toastr.info('Erro ao tentar atualizar a música  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaCameras[$scope.indiceAtualizar].descricao = parametros.descricao;
                    $scope.showListCamera();
                    toastr.success('Música atualizada!', 'Sucesso');
                }
            })
            .error(function (data) {
                console.log(data);
                toastr.error('Falha em salvar música', 'Erro');
            });
    };

    $scope.listarCameras();
   
});