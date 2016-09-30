every.controller('operadoraTaxiController', function ($scope, $http, usuarioAPI,  $location) {
    var parametros = usuarioAPI.getUsuario();
    parametros.id = $scope.$parent.usuario.id_cooperativa;

   
//$scope.$parent.usuario

    $scope.cooperativa ={};
   $http.post(base + 'cooperativa/viewbyid', parametros)
                .success(function (data) {
                    console.log(data);
                    if (data.reason != "success") {
                        toastr.info('Erro ao localizar a cooperativa do usuario  <br/>' + data.errors[0][0].message, 'Informação');
                    } else {
                        $scope.cooperativa = data.data.view;
                         console.log($scope.cooperativa);

                    }
                })
                .error(function (data) {
                   // console.log(data);
                    toastr.error('Você não possui acesso à nenhum cooperativa', 'Erro');
                });
   
});
