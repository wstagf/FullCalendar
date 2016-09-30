
every.controller('categoria_produtoController', function ($scope, $http, usuarioAPI) {
    var parametros = usuarioAPI.getUsuario();
    parametros.idBalada = $scope.$parent.baladaSelecionada.id;

    

    $scope.CategoriaProduto = {
        id: 0,
        descricao: '',
    };
    $scope.CategoriaProdutoAdd = {
        id: 0,
        descricao: ''
    };
    $scope.lstCategoriaProduto = true;
    $scope.addCategoriaProduto = false;
    $scope.updtCategoriaProduto = false;
    $scope.lstCategoriaProdutoCarregada = false;
    $scope.indiceAtualizar = 0;

    $scope.showEditarCategoriaProduto = function () {
        $scope.addCategoriaProduto = false;
        $scope.lstCategoriaProduto = false;
        $scope.updtCategoriaProduto = true;
    };
    $scope.showAddCategoriaProduto = function () {
        $scope.addCategoriaProduto = true;
        $scope.lstCategoriaProduto = false;
        $scope.updtCategoriaProduto = false;

        $scope.CategoriaProdutoAdd = {
            id: 0,
            descricao: ''
        };
    };
    $scope.showListCategoriaProduto = function () {
        $scope.addCategoriaProduto = false;
        $scope.lstCategoriaProduto = true;
        $scope.updtCategoriaProduto = false;
    };


    $scope.inserirCategoriaProduto = function () {
        parametros.descricao = $scope.CategoriaProdutoAdd.descricao;
        $http.post(base + 'categoriaproduto/insert', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    console.log(data);
                    toastr.info('Erro ao adicionar categoria  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.CategoriaProdutoAdd = {
                        descricao: ''
                    };
                    toastr.success('Categoria cadastrada com sucesso!', 'Sucesso');
                    $scope.showListCategoriaProduto();
                    $scope.listarCategoriaProdutos();
                }               
            })
            .error(function (data) {
                console.log(data);
                toastr.error('Falha em adicionar categoria de produto', 'Erro');
            });
    }

    $scope.listaCategoriaProdutos = {};
    $scope.listarCategoriaProdutos = function () {
        parametros.idBalada = $scope.$parent.baladaSelecionada.id;
  
         $http.post(base  + 'categoriaproduto/view', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    console.log(data);
                    toastr.info('Não foram encontrados registos  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaCategoriaProdutos = data.data.view;
                    $scope.lstCategoriaProdutoCarregada = true;
                }
            })
            .error(function (data) {
                console.log(data);
                toastr.error('Erro ao localizar categorias', 'Erro');
           });
    };

    $scope.editarCategoriaProduto = function (indexCategoriaProduto) {
        $scope.indiceAtualizar = indexCategoriaProduto;
        parametros.id = $scope.listaCategoriaProdutos[indexCategoriaProduto].id;
        $http.post(base + 'categoriaproduto/viewbyid', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    console.log(data);
                    toastr.info('Não foram encontrados registos  <br/>' + 'Informação');
                } else {
                    $scope.CategoriaProduto = data.data.view[0];
                    $scope.showEditarCategoriaProduto();
                }               
            })
            .error(function (data) {
                console.log(data);
                toastr.error('Falha em editar categoria de produto', 'Erro');
            });
    };


    $scope.excluirCategoriaProduto = function (indexCategoriaProduto) {
        parametros.id = $scope.listaCategoriaProdutos[indexCategoriaProduto].id;

        $http.post(base + 'categoriaproduto/delete', parametros)
           .success(function (data) {
               if (data.reason != "success") {
                   toastr.info('Erro ao tentar excluir a categoria  <br/>' + data.errors[0][0].message, 'Informação');
               } else {
                   $scope.listaCategoriaProdutos.splice([indexCategoriaProduto], 1);
                   $scope.showListCategoriaProduto();
                   toastr.success('Categoria apagado com sucesso', 'Sucesso');
               }
           })
           .error(function (data) {
               toastr.error('Falha em excluir categoria', 'Erro');
               console.log(data);
           });
    };

    $scope.alterarCategoriaProduto = function () {
        parametros.id = $scope.CategoriaProduto.id;
        parametros.descricao = $scope.CategoriaProduto.descricao;

        $http.post(base + 'categoriaproduto/update', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao tentar atualizar a categoria  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                    $scope.listaCategoriaProdutos[$scope.indiceAtualizar].descricao = parametros.descricao;
                    $scope.showListCategoriaProduto();
                    toastr.success('Categoria atualizada!', 'Sucesso');
                }
            })
            .error(function (data) {
                toastr.error('Falha em salvar categoria de produto', 'Erro');
            });
    };

    $scope.listarCategoriaProdutos();
});