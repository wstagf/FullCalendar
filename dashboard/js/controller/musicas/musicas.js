every.controller('musicasController', function ($scope, $http, usuarioAPI) {
   var parametros = usuarioAPI.getUsuario();
   

   $scope.Musica = {
        id: 0,
        descricao: '',
    };
    $scope.MusicaAdd = {
        id: 0,
        descricao: ''
    };
    $scope.lstMusica = true;
    $scope.addMusica = false;
    $scope.updtMusica = false;
    $scope.lstMusicaCarregada = false;
    $scope.indiceAtualizar = 0;

    $scope.showEditarMusica = function () {
        $scope.addMusica = false;
        $scope.lstMusica = false;
        $scope.updtMusica = true;
    };
    $scope.showAddMusica = function () {
        $scope.addMusica = true;
        $scope.lstMusica = false;
        $scope.updtMusica = false;

        $scope.MusicaAdd = {
            id: 0,
            descricao: ''
        };
    };
    $scope.showListMusica = function () {
        $scope.addMusica = false;
        $scope.lstMusica = true;
        $scope.updtMusica = false;
    };


    $scope.inserirMusica = function () {
        parametros.idBalada = $scope.$parent.baladaSelecionada.id;
        parametros.nomeMusica = $scope.MusicaAdd.nome_musica;
        parametros.linkMusica = $scope.MusicaAdd.link_musica;

        $http.post(base + 'musicas/insert', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    console.log(data);
                    toastr.info('Erro ao adicionar música  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.MusicaAdd = {
                        descricao: ''
                    };
                    toastr.success('Música cadastrada com sucesso!', 'Sucesso');
                    $scope.showListMusica();
                    $scope.listarMusicas();
                }               
            })
            .error(function (data) {
                console.log(data);
                toastr.error('Falha em adicionar música', 'Erro');
            });
    }

    $scope.listaMusicas = {};
    $scope.listarMusicas = function () {
        parametros.idBalada = $scope.$parent.baladaSelecionada.id;
           $http.post(base  + 'musicas/view', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    console.log(data);
                    toastr.info('Não foram encontrados registos  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaMusicas = data.data.view;
                    $scope.lstMusicaCarregada = true;
                }
            })
            .error(function (data) {
                console.log(data);
                toastr.error('Erro ao localizar categorias', 'Erro');
           });
    };

    $scope.editarMusica = function (musica) {
        $scope.Musica  = musica
        $scope.showEditarMusica();
    };


    $scope.excluirMusica = function (indexMusica) {
        parametros.idBalada = $scope.$parent.baladaSelecionada.id;
        parametros.id = $scope.listaMusicas[indexMusica].id;

        $http.post(base + 'musicas/delete', parametros)
           .success(function (data) {
               if (data.reason != "success") {
                   toastr.info('Erro ao tentar excluir a música  <br/>' + data.errors[0][0].message, 'Informação');
               } else {
                   $scope.listaMusicas.splice([indexMusica], 1);
                   $scope.showListMusica();
                   toastr.success('Música apagada com sucesso', 'Sucesso');
               }
           })
           .error(function (data) {
               toastr.error('Falha em excluir música', 'Erro');
               console.log(data);
           });
    };

    $scope.alterarMusica = function (musica) {
        parametros.idBalada = $scope.$parent.baladaSelecionada.id;
        parametros.id = $scope.Musica.id;
        parametros.nomeMusica = $scope.Musica.nome_musica;
        parametros.linkMusica = $scope.Musica.link_musica;

        $http.post(base + 'musicas/update', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    console.log(data);
                    toastr.info('Erro ao tentar atualizar a música  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaMusicas[$scope.indiceAtualizar].descricao = parametros.descricao;
                    $scope.showListMusica();
                    toastr.success('Música atualizada!', 'Sucesso');
                }
            })
            .error(function (data) {
                console.log(data);
                toastr.error('Falha em salvar música', 'Erro');
            });
    };

    $scope.listarMusicas();
   
});