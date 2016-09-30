var root = 0;
every.controller('dashboardController', function ($scope, $http, usuarioAPI, $location) {  

 var parametros = usuarioAPI.getUsuario();

   $scope.listarTodasBaladas = function() {
       console.log('listarTodasBaladas')
   };

   $scope.baladaSelecionada = {}
   $scope.minhasBaladas = {};

   $scope.listarMinhasBaladas = function() {
       console.log('listarMinhasBaladas')
       parametros.id =  $scope.$parent.usuario.id
       $http.post(base + 'balada/viewbyowner', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    toastr.info('Erro ao adicionar país  <br/>' + data.errors[0][0].message, 'Informação');
                } else {
                   $scope.minhasBaladas = data.data.view;
                   $scope.baladaSelecionada = data.data.view[0];
                }               
            })
            .error(function (data) {
                toastr.error('Falha em adicionar país', 'Erro');
            });
   };

   $scope.escolheBalada= function(item) {
      $scope.baladaSelecionada = item;
      $location.path( "/dashboard" );
   }


 
  if ($scope.$parent.usuario.dono_balada) {
        
        $scope.listarMinhasBaladas();
  } else {
        $scope.baladaSelecionada.nome_balada = 'Every';
        $scope.listarTodasBaladas();
  };




  $scope.templates =
        [{ name: 'home', href: 'dashboard/home.html'},
        { name: 'morris.html', href: 'morris.html'}];
  $scope.template = $scope.templates[0];
  
    $scope.itensMenu = [];
    var qdeItemMenu;
    var parametros = usuarioAPI.getUsuario();
   
    $scope.model = [];
      
    $scope.carregaMenu = function () {
        $http.post(base + 'usuario/getmenu', parametros)
                .success(function (data) {
                    if (data.reason != "success") {
                        toastr.info('Erro ao montar o menu principal  <br/>' + data.errors[0][0].message, 'Informação');
                        $location.path( "/logout" );
                    } else {
                        $scope.itensMenu = data.data.view;

                        for (i = 0; i < data.data.view.length; i++) {
                            
                            $scope.model.push(data.data.view[i]);
                            
                            if ($scope.itensMenu[i].filhos.length > 0 ) {
                                $scope.itensMenu[i].temFilho = true;
                            } else {
                                $scope.itensMenu[i].temFilho = false;
                            }
                        }
                        
                    }
                })
                .error(function (data) {
                    toastr.error('Falha ao montar o menu principal', 'Erro');
                    $location.path( "/logout" );
                });
    };

    $scope.carregaMenu();
  
    $scope.carregarRelatorio = function () {
        var parametros = usuarioAPI.getUsuario();
        parametros.idBalada = 4;
        $http.post(base + 'relatorios/grossgain', parametros)
            .success(function (data) {
                if (data.reason != "success") {
                    console.log(data);
                } else {
                     console.log(data);
                }               
            })
            .error(function (data) {
                
                toastr.error('Falha em montar relatorio', 'Erro');
            });
    };

    $location.path( "/dashboard" );
});



every.controller('myInnerController', function($scope) {
    $scope.messageInner = "clicou";
    
    $scope.grafico = {
      series: [
                {
                    name: 'Periodos',
                    colorByPoint: true,
                    data: [
                            {
                                name: 'Janeiro',
                                y: 56.33,
                                drilldown: 'Janeiro'
                            },
                            {
                                name: 'Fevereiro',
                                y: 56.33,
                                drilldown: 'Fevereiro'
                            },
                            {
                                name: 'Março',
                                y: 56.33,
                                drilldown: 'Marco'
                            }
                    ]
                  }
                ],
          drilldown: 'teste'
       }

    Highcharts.chart('container', {
      title: {
        text: ''
      },

      chart: {
            type: 'column'
        },
    
      
      credits: {
        enabled: false
      },

      
        chart: {
            type: 'column'
        },
        title: {
            text: 'Entradas por mês'
        },
        subtitle: {
            text: 'Click no periodo para ver o detalhamento das entradas.'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'valores em R$'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>R$ {point.y:.2f}</b><br/>'
        },

        series: $scope.grafico.series,
        drilldown: {
            series: [{
                name: 'Janeiro',
                id: 'Janeiro',
                data: [
                    [
                        'Pedidos',
                        24.13
                    ],
                    [
                        'Compras',
                        17.2
                    ],
                    [
                        'Entradas',
                        8.11
                    ],
                    [
                        'Couvert',
                        5.33
                    ],
                    [
                        'Vallet',
                        1.06
                    ],
                    [
                        'Reservas',
                        0.5
                    ]
                ]
            }, 
            {
                name: 'Fevereiro',
                id: 'Fevereiro',
                data: [
                    [
                        'Pedidos',
                        214.13
                    ],
                    [
                        'Compras',
                        137.2
                    ],
                    [
                        'Entradas',
                        84.11
                    ],
                    [
                        'Couvert',
                        55.33
                    ],
                    [
                        'Vallet',
                       21.06
                    ],
                    [
                        'Reservas',
                        10.5
                    ]
                ]
            }, 
            {
                name: 'Março',
                id: 'Marco',
                data: [
                    [
                        'Pedidos',
                        4.13
                    ],
                    [
                        'Compras',
                        1.2
                    ],
                    [
                        'Entradas',
                        8.4
                    ],
                    [
                        'Couvert',
                        5.4
                    ],
                    [
                        'Vallet',
                        1.7
                    ],
                    [
                        'Reservas',
                        0.5
                    ]
                ]
            }]
        }
    });
  });
  
