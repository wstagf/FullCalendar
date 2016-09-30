every.controller('meuPerfilController', function ($scope, $http, usuarioAPI, $filter, Upload, $timeout) {
    $scope.editandoFoto = false;
    $scope.usuarioCarregado = false;
    $scope.usuario = {};
    $scope.usuarioOriginal = {};
    $scope.listaSexo = [
            { id: '0', text: 'Feminino' },
            { id: '1', text: 'Masculino' }
    ];
    $scope.sexoSelecionado = {};

    $scope.converterSexo = function (data) {
        if (data == 'masculino') {
            $scope.sexoSelecionado = $scope.listaSexo[1];
            return '1'
        }
        else {
            $scope.sexoSelecionado = $scope.listaSexo[0];
            return '0'
        }
    };

/*
    $scope.carregarUsuario = function () {
        $http.post(base + 'usuario/view', usuarioAPI.getUsuario()).success(function (data) {
            $scope.usuario = data.data.view;
            $scope.usuario.data_nasc = moment($scope.usuario.data_nasc, 'YYYY-MM-DD').format('DD/MM/YYYY');
            $scope.usuarioOriginal = angular.copy($scope.usuario);
            $scope.usuario.url_foto_original = angular.copy($scope.usuario.url_foto);
            $scope.converterSexo($scope.usuario.sexo);
            $scope.usuarioCarregado = true;
        });
    };
*/
    $scope.carregarUsuario();

    $scope.updateUsuario = function ($data) {
        $scope.usuario.editado = true;
    };

    $scope.salvar = function () {
        $scope.usuario.editado = false;
        $scope.usuario.sexo = $scope.sexoSelecionado.text;
        var parametros = usuarioAPI.getUsuario();
        parametros.nome = $scope.usuario.nome;
        parametros.novoEmail = $scope.usuario.email;
        parametros.sexo = $scope.sexoSelecionado.id;
        parametros.cpf = $scope.usuario.cpf.replace(/\D/g, "");
        parametros.rg = $scope.usuario.rg;
        parametros.dataNascimento = moment($scope.usuario.data_nasc, "DD/MM/YYYY").format('YYYY-MM-DD');

        $http.post(base + 'usuario/update', parametros).success(function (data) {
            alert("Dados do usuario atualizado");
        });
    };

    $scope.cancelar = function () {
        $scope.usuario = angular.copy($scope.usuarioOriginal)
    };

    $scope.editar = function () {
        $scope.usuario.editado = true;
    }

    $scope.validarData = function () {
        if (!moment($scope.usuario.data_nasc, 'DD/MM/YYYY').isValid()) {
            $scope.usuario.data_nasc = $scope.usuarioOriginal.data_nasc;
        } else {
            $scope.usuario.data_nasc = moment($scope.usuario.data_nasc).format('DD/MM/YYYY');
        }
    }

    $scope.editarFoto = function () {
        $scope.editandoFoto = true;
        fileInput.click();
    };

    $scope.cancelarEditarFoto = function () {
        alert('Cancelado alteraçoes')
        $scope.editandoFoto = false;
    };

    $scope.uploadPic = function () {
        $scope.editandoFoto = false;
        file = dataURItoBlob($scope.myCroppedImage);
        var parametros = usuarioAPI.getUsuario();
        parametros.foto = file;
        if (file) {
            file.upload = Upload.upload({
                url: base + '/usuario/update',
                data: parametros,
            });
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
            var callback1 = false;
            file.upload.finally(function (data) {
                $scope.usuario.url_foto = angular.copy($scope.usuario.url_foto_original);
                $scope.usuario.url_foto = ($scope.usuario.url_foto + '?' + new Date().getTime());
                myForm.file.$valid = !myForm.file.$valid;
                //$scope.usuario.url_foto = $scope.usuario.url_foto;
                //$scope.usuario.url_foto_original = $scope.usuario.url_foto;
            }, function (data) {

                if (callback1) {
                    alert('Foto do usuario alterado');
                };
                callback1 = true;
            });
        }
    };

    $scope.myImage = '';
    $scope.myCroppedImage = '';

    var handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
});