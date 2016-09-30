every.controller('eventosController', function ($scope, $http, usuarioAPI) {
               $scope.message = 'Look! I am an about page. - eventosConaaaqtroller';
               $scope.inserindoEvento = false;
                  
               $scope.eventoAdd = {
                   title: 'Título do Evento'
               };

               $scope.AtualizarEvento = function() {
                   
               }

               
                $scope.inserirEvento = function() {

                    if ($scope.eventoAdd.dataInicio > $scope.eventoAdd.dataFim) {
                        toastr.error('A data final deve ser após a data inicial', 'Erro');
                    } else{
                       $scope.events.push({
                                    title: $scope.eventoAdd.title,
                                    start: $scope.eventoAdd.dataInicio,
                                    end: $scope.eventoAdd.dataFim,
                                    valorCouvert: $scope.eventoAdd.valorCouvert,
                                    valorConsumacaoMinima: $scope.eventoAdd.valorConsumacaoMinima,
                                    valorEntrada: $scope.eventoAdd.valorEntrada,
                                    valorReserva: $scope.eventoAdd.valorReserva,
                                    funcionamentoPadrao: $scope.eventoAdd.funcionamentoPadrao,
                                    className: ['openSesame']
                                });
                        $scope.inserindoEvento = false;
                        $scope.limparEvento();
                    }
               };

               $scope.fecharInsercao = function() {
                   $scope.inserindoEvento = false;
                   $scope.limparEvento();
               };

               
                $scope.fecharAtualizacao = function() {
                   $scope.editandoEvento = false;
                   $scope.limparEvento();
               };

               $scope.limparEvento = function() {
                    $scope.eventoAdd = {};
               }

                    var date = new Date();
                    var d = date.getDate();
                    var m = date.getMonth();
                    var y = date.getFullYear();


            $scope.listarEventos = function () {
                    $scope.eventos = {};
                    var parametros = usuarioAPI.getUsuario();
                    parametros.idBalada = $scope.$parent.baladaSelecionada.id;
                    $http.post(base + '/evento/viewbybalada', parametros)
                        .success(function (data) {
                            console.log(data)
                            if (data.reason != "success") {
                                 toastr.info('Não foram encontrados eventos  <br/>' + data.errors[0][0].message, 'Informação');
                                 //$scope.lstCidadeCarregada = true;
                            } else {
                                var obj = data.data.view.map(function(item){
                                    return {
                                        start: item.data_hora_inicio_evento,
                                        end: data_hora_fim_evento,
                                        data_hora_fim_evento: data_hora_fim_evento,
                                        data_hora_fim_reserva: data_hora_fim_reserva,
                                        data_hora_inicio_evento: data_hora_inicio_evento,
                                        data_hora_inicio_reserva:data_hora_inicio_reserva,
                                        descricao: descricao,
:
"mes janeiro"
id
:
"5"
valor_consumacao_minima
:
"10.0000"
valor_couvert
:
"10.0000"
valor_entrada
:
".0000"

                                    };
                                })

                                 console.log(obj);
                            }
                            
                            
                            /*
                            if (data.reason != "success") {
                                toastr.info('Não foram encontrados eventos  <br/>' + data.errors[0][0].message, 'Informação');
                             
                            } else {
                                //$scope.listaCidades = data.data.view;
                                //$scope.lstCidadeCarregada = true;
                            }
                            */
                        })
                        .error(function (data) {
                            console.log(data)
                            //toastr.error('Erro ao localizar eventos', 'Erro');
                        });
                };



               $scope.events = [
                   {title: 'All Day Event',start: new Date(y, m, 1)},
                    {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
                    {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
                    {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
                    {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
                    {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
                    ];

                    $scope.eventSources = [$scope.events];

                    $scope.setEventoEdit = function(event) {
                            $scope.editandoEvento = true;
                            $scope.inserindoEvento = false;
                            $scope.eventoEdit = event;
                            $scope.eventoEdit.dataInicio = new Date(event.start);
                            if(event.end) {
                                console.log('true')
                                $scope.eventoEdit.dataFim = new Date(angular.copy(event.end).subtract(1, 's'));
                            } else {
                                  console.log('false')
                                $scope.eventoEdit.dataFim = new Date(moment(event.start).endOf('day'));
                            }                            
                    }

                    $scope.eventClick  =  function(event) {
                            $scope.fecharAtualizacao(); 
                            $scope.setEventoEdit(event);
                        };

                    $scope.eventDrop  =  function(event) {
                            $scope.fecharAtualizacao(); 
                            $scope.setEventoEdit(event);
                        };

                    $scope.eventResize  =  function(event) {
                            $scope.fecharAtualizacao(); 
                            $scope.setEventoEdit(event);
                        };

                 $scope.uiConfig = {
                    calendar:{
                        height: 600,
                         editable: true,
                        resizable: true,
                        ignoreTimezone: false,
                        eventLimit: 3,
                        header:{
                        left: 'month agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                        },
                        eventClick:$scope.eventClick,
                        eventDrop: $scope.eventDrop,
                        eventResize:$scope.eventResize,
                        dayClick: function(date) {
                              $scope.limparEvento();
                              $scope.inserindoEvento = true;
                              $scope.editandoEvento = false;
                              $scope.eventoAdd.dataInicio = new Date(date.add(3, 'H'));
                              $scope.eventoAdd.title = 'Título do Evento';
                            }
                    }
                };

                $scope.uiConfig.calendar.dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];
                $scope.uiConfig.calendar.dayNamesShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
                $scope.uiConfig.calendar.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
                $scope.uiConfig.calendar.monthNamesShort = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
               

               $scope.listarEventos();
            });