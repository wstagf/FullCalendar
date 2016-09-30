var logout = function() {
    window.location.href = "http://bimore.com.br:8080/every/admin/dashboard/pages/logout.php";

}

//var base = 'http://bimore.ddns.net:8080/every/rest/';
var base = 'http://bimore.com.br:8080/every/rest/';
var usuario = {};

var every = angular.module('every', ['ngCookies', 'ngRoute', 'ngMask', 'ui.grid', 'ui.grid.edit', 'ui.grid.moveColumns', 'ui.utils.masks', 
                                        'ngFileUpload', 'ngImgCrop', 'checklist-model', 'ui.calendar', 'xeditable']);

            every.config(function($routeProvider, $locationProvider) {
              $locationProvider.html5Mode(true); // remove o # da url
              $routeProvider
               // caso não seja nenhum desses, redirecione para a rota '/'
                .when('/logout', {
                  templateUrl : 'logout.php',
                  controller  : 'logoutController'
              })  
              .when('/meuPerfil', {
                  templateUrl: 'configuracao/meuPerfil.html',
                  controller: 'meuPerfilController'
              })



              .when('/dashboard', {
                   templateUrl: 'dashboard.html',
                   controller: 'dashboardController',
               })
              
              
              .when('/categoriaproduto', {
                  templateUrl: 'loja/categoriaproduto.html',
                  controller: 'categoria_produtoController',
              })
              .when('/clubewhisky', {
                  templateUrl: 'loja/clubewhisky.html',
                  controller: 'clubewhiskyController'
              })
              .when('/compras', {
                  templateUrl: 'loja/compras.html',
                  controller: 'comprasController'
              })
              .when('/eventos', {
                  templateUrl: 'loja/eventos.html',
                  controller: 'eventosController'
              })
              .when('/listavip', {
                  templateUrl: 'loja/listavip.html',
                  controller: 'listavipController'
              })
              .when('/pedidos', {
                  templateUrl: 'loja/pedidos.html',
                  controller: 'pedidosController'
              })
              .when('/reservas', {
                  templateUrl: 'loja/reservas.html',
                  controller: 'reservasController'
              })
              .when('/produtos', {
                  templateUrl: 'loja/produtos.html',
                  controller: 'produtosController'
              })

                //Relatorios
                .when('/relatorioTaxi', {
                    templateUrl: 'relatorio/relatorioTaxi.html',
                    controller: 'relatorioTaxiController'
                })
              .when('/relatorioClientesPagantes', {
                  templateUrl: 'relatorio/relatorioClientesPagantes.html',
                  controller: 'relatorioClientesPagantesController'
              })
              .when('/relatorioConsumo', {
                  templateUrl: 'relatorio/relatorioConsumo.html',
                  controller: 'relatorioConsumoController'
              })
              .when('/relatorioProdutos', {
                  templateUrl: 'relatorio/relatorioProdutos.html',
                  controller: 'relatorioProdutosController'
              })
              .when('/relatorioRedesSociais', {
                  templateUrl: 'relatorio/relatorioRedesSociais.html',
                  controller: 'relatorioRedesSociaisController'
              })

                  // centralQR
                .when('/centralQR', {
                    templateUrl: 'qr/centralQR.html',
                    controller: 'centralQRController'
                })

                  // cameras
              .when('/cameras', {
                  templateUrl: 'cameras/listaCameras.html',
                  controller: 'camerasController'
              })

                  // valletCheckIn
              .when('/valletCheckIn', {
                  templateUrl: 'vallet/checkin.html',
                  controller: 'valletCheckInController'
              })

                // musicas
                 .when('/musicas', {
                     templateUrl: 'musicas/listamusicas.html',
                     controller: 'musicasController'
                 })

               // redes sociais
              .when('/redesSociais', {
                  templateUrl: 'redesSociais/pontos.html',
                  controller: 'redesSociaisController'
              })

                // taxi
              .when('/taxiCooperativas', {
                  templateUrl: 'taxi/taxiCooperativas.html',
                  controller: 'taxiCooperativasController'
              })
              

                  // configurações
                .when('/configuracaoBalada', {
                    templateUrl: 'configuracao/configuracaoBalada.html',
                    controller: 'configuracaoBaladaController'
                })
                .when('/configuracaoEstiloBalada', {
                  templateUrl: 'configuracao/configuracaoEstiloBalada.html',
                  controller: 'configuracaoEstiloBaladaController'
                })
                .when('/configuracaoOrientacaoSexual', {
                  templateUrl: 'configuracao/configuracaoOrientacaoSexual.html',
                  controller: 'configuracaoOrientacaoSexualController'
              })
                .when('/configuracaoEstadoCivil', {
                  templateUrl: 'configuracao/configuracaoEstadoCivil.html',
                  controller: 'configuracaoEstadoCivilController'
              })
                .when('/configuracaoContrato', {
                  templateUrl: 'configuracao/configuracaoContrato.html',
                  controller: 'configuracaoContratoController'
              })
                .when('/configuracaoPaises', {
                    templateUrl: 'configuracao/configuracaoPaises.html',
                    controller: 'configuracaoPaisesController'
                })
                .when('/configuracaoEstados', {
                    templateUrl: 'configuracao/configuracaoEstados.html',
                    controller: 'configuracaoEstadosController as estadoController'
                })
                .when('/configuracaoCidades', {
                    templateUrl: 'configuracao/configuracaoCidades.html',
                    controller: 'configuracaoCidadesController'
                })

              
              .otherwise ({ redirectTo: '/' });
           
             



              

              /*
               
             .when('/taxiAdminCooperativa', {
                  templateUrl: 'taxi/indexTaxi.php',
                  controller: 'operadoraTaxiController'
              })
              
             


              


                  
             
                  

            


               // caso não seja nenhum desses, redirecione para a rota '/'
               .otherwise ({ redirectTo: '/' });
                */
            });
     
                        
            every.controller('logoutController', function($scope,  $window) {
                $window.location.href = '/every/admin/';                
            });

            every.controller('clubewhiskyController', function ($scope) {
                $scope.message = 'Look! I am an about page. - clubewhiskyController';
            });

            every.controller('comprasController', function ($scope) {
                $scope.message = 'Look! I am an about page. - comprasController';
            });

            every.controller('listavipController', function ($scope) {
                $scope.message = 'Look! I am an about page. - listavipController';
            });

            every.controller('pedidosController', function ($scope) {
                $scope.message = 'Look! I am an about page. - pedidosController';
            });

            every.controller('reservasController', function ($scope) {
                $scope.message = 'Look! I am an about page. - reservasController';
            });

            every.controller('produtosController', function ($scope) {
                $scope.message = 'Look! I am an about page. - produtos';
            });


            every.controller('relatorioTaxiController', function ($scope) {
                $scope.message = 'Look! I am an about page. - relatorioTaxiController';
            });

            every.controller('relatorioClientesPagantesController', function ($scope) {
                $scope.message = 'Look! I am an about page. - relatorioClientesPagantesController';
            });

            every.controller('relatorioConsumoController', function ($scope) {
                $scope.message = 'Look! I am an about page. - relatorioConsumoController';
            });

            every.controller('relatorioProdutosController', function ($scope) {
                $scope.message = 'Look! I am an about page. - relatorioProdutosController';
            });

            every.controller('relatorioRedesSociaisController', function ($scope) {
                $scope.message = 'Look! I am an about page. - relatorioRedesSociaisController';
            });

           
            every.controller('centralQRController', function ($scope) {
                $scope.message = 'Look! I am an about page. - centralQRController';
            });

            every.controller('valletCheckInController', function ($scope) {
                $scope.message = 'Look! I am an about page. - valletCheckInController';
            });
      

            every.controller('redesSociaisController', function ($scope) {
                $scope.message = 'Look! I am an about page. - redesSociaisController';
            });

            every.controller('configuracaoBaladaController', function ($scope) {
                $scope.message = 'Look! I am an about page. - configuracaoBaladaController';
            });

           

            
 angular.module("every").filter('cpfFormat', function () {
     return function (v) {
         if (v) {
             v = v.replace(/\D/g, "")                 //Remove tudo o que não é dígito
             v = v.replace(/(\d{3})(\d)/, "$1.$2")    //Coloca ponto entre o terceiro e o quarto dígitos
             v = v.replace(/(\d{3})(\d)/, "$1.$2")    //Coloca ponto entre o setimo e o oitava dígitos
             v = v.replace(/(\d{3})(\d)/, "$1-$2")   //Coloca ponto entre o decimoprimeiro e o decimosegundo dígitos
             return v
         }
     };
 });

 angular.module("every").filter('converterData', function () {
     return function (data) {
         return (data).substr(8, 2) + '/' + (data).substr(5, 2) + '/' + (data).substr(0, 4)
     }
 });

 angular.module("every").directive('accordion', function () {
     return {
         restrict: 'E',
         scope: { model: '=' },
         templateUrl: 'panelTemplate.html',
         link: function (scope, element, attr) {
             scope.parentId = attr.id;
         }
     }
 });

 function dataURItoBlob(dataURI) {
     // convert base64/URLEncoded data component to raw binary data held in a string
     var byteString;
     if (dataURI.split(',')[0].indexOf('base64') >= 0)
         byteString = atob(dataURI.split(',')[1]);
     else
         byteString = unescape(dataURI.split(',')[1]);

     // separate out the mime component
     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

     // write the bytes of the string to a typed array
     var ia = new Uint8Array(byteString.length);
     for (var i = 0; i < byteString.length; i++) {
         ia[i] = byteString.charCodeAt(i);
     }

     return new Blob([ia], { type: mimeString });
 }

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

every.controller('every', function ($scope, $http,  $location, usuarioAPI, $cookies) {
    
    $scope.usuario = {};
    $scope.perfil = "";
    $http.post(base + 'usuario/view', usuarioAPI.getUsuario())
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao tentar localizar usuario  <br/>' + data.errors[0][0].message, 'Informação');
                     logout();
                } else {
                    console.log(data.data.view);
                     $scope.usuario = data.data.view; 
                     if (!($scope.usuario.id_cooperativa == null || $scope.usuario.id_cooperativa == 0)) {
                        $scope.perfil = 'taxi'
                        $scope.pagina ='indexTaxi.php';
                     } else {
                         if ($scope.usuario.id_perfil_usuario == 7) {
                             $scope.perfil = 'admin'
                             $scope.pagina ='indexDashboard.php';
                         } else {
                            if ($scope.usuario.dono_balada || $scope.usuario.id_perfil_usuario == 2) {
                             $scope.perfil = 'balda'
                             $scope.pagina ='indexDashboard.php';
                            } else {
                               logout();
                            }
                         }
                     };
                }
            })
            .error(function (data) {
                toastr.error('Falha ao tentar localizar usuario', 'Erro');
               logout();
            });
   // $location.path( "/taxiAdminCooperativa" );
    // se cooperativa 
    //$location.path( "/dashboard" );   

});


every.controller('donoBaladaController', function ($scope, $http, usuarioAPI) {

});

