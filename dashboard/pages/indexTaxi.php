  <div   ng-controller="operadoraTaxiController" class="col-lg-12">
       <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">{{cooperativa.nome}}</h1>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa  fa-child   fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">26</div>
                                    <div>Corridas em aberto</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">Ver detalhes</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-green">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-flag fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">12</div>
                                    <div>Corridas efetuadas hoje</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">Ver detalhes</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-yellow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa  fa-road fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">124</div>
                                    <div>Corridas em transito</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">Ver detalhes</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-red">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-taxi fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">13</div>
                                    <div>Taxis parados</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">Ver detalhes</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div class="row">
			<div class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="glyphicon glyphicon-th fa-fw"></i>Corridas
                            <div class="pull-right">
                                <button type="button" data-ng-click="fight()">Fight</button>
                                <button type="button" data-ng-click="stopTimerGetCorridas()">StopFight</button>
                            </div>

                        </div>

                        <div class="panel-body">
                       
                       <div class="table-responsive">

                         {{data}}

                            <table id="example" class="dataTable row-border stripe" datatable="ng" cellspacing="0" width="100%" dt-options="dtOptions" dt-column-defs="dtColumnDefs">
                                    <thead>
                                        <tr>
                                                <th>ID</th>
                                                <th>Usuario</th>
                                                <th>Balada</th>
                                                <th>Taxi</th>
                                                <th>Ações</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                        <tr ng-repeat="corrida in corridas">
                                            <td>{{ corrida.id }}</td>
                                            <td>{{ corrida.nome }}</td>
                                            <td>{{ corrida.nome_balada  }}</td>
                                            <td>{{ corrida.placa_carro  }}</td>
                                            <td> <div ng-show="corrida.status == 1">
                                                        <button type="button" class="btn btn-outline btn-btn btn-outline btn-primary"> <i class="glyphicon glyphicon-open"></i> Enviar</button>
                                                    </div>
                                                    <div ng-show="corrida.status == 2">
                                                        <button type="button" class="btn btn-outline btn-success"> <i class="glyphicon glyphicon-open"></i> Finalizar</button>
                                                    </div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>



                </div>

                <div class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bar-chart-o fa-fw"></i> Grafico de linha
                            <div class="pull-right">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                        Período
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu pull-right" role="menu">
                                        <li><a href="#">Mensal</a>
                                        </li>
                                        <li><a href="#">Trimestral</a>
                                        </li>
                                        <li><a href="#">Semestral</a>
                                        </li>
                                        <li><a href="#">Anual</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="panel-body">
                             <div ng-controller="myInnerController as ctrl" id="container">Placeholder for chart</div>
                        </div>

                    </div>
                </div>
            </div>
            

    </div>

