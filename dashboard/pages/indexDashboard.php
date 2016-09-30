<div id="wrapper" ng-controller="dashboardController">
            <!-- Navigation -->
            <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0;position: fixed;width: 100%;">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="index.php">Evey - Área administrativa: {{baladaSelecionada.nome_balada}}</a>
                </div>
                <!-- /.navbar-header -->

                <ul class="nav navbar-top-links navbar-right">
                <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="fa fa-tasks fa-fw"></i>
                            <i class="fa fa-caret-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-alerts">
                             <li ng-repeat="balada in minhasBaladas"><a href="#" ng-click="escolheBalada(balada)"><div><i class="fa fa-bookmark-o fa-fw"></i>{{balada.nome_balada}}</div></a></li>
                        </ul>
                           
                        <!-- /.dropdown-alerts -->
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="fa fa-bell fa-fw"></i>
                            <i class="fa fa-caret-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-alerts">
                            <li>
                                <a href="#">
                                    <div>
                                        <i class="fa fa-comment fa-fw"></i>New Comment
                                        <span class="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i class="fa fa-twitter fa-fw"></i>3 New Followers
                                        <span class="pull-right text-muted small">12 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i class="fa fa-envelope fa-fw"></i>Message Sent
                                        <span class="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i class="fa fa-tasks fa-fw"></i>New Task
                                        <span class="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i class="fa fa-upload fa-fw"></i>Server Rebooted
                                        <span class="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a class="text-center" href="#">
                                    <strong>See All Alerts</strong>
                                    <i class="fa fa-angle-right"></i>
                                </a>
                            </li>
                        </ul>
                        <!-- /.dropdown-alerts -->
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="fa fa-user fa-fw"></i>
                            <i class="fa fa-caret-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-user">
                            <li>
                                <a href="meuPerfil">
                                    <i class="fa fa-user fa-fw"></i>Meu perfil
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="logout">
                                    <i class="fa fa-sign-out fa-fw"></i>Logout
                                </a>
                            </li>
                        </ul>
                        <!-- /.dropdown-user -->
                    </li>
                </ul>
                <div class="navbar-default sidebar" role="navigation">
                    <div class="sidebar-nav navbar-collapse">
                        <ul class="nav" id="side-menu">
                        <script type="text/ng-template" id="panelTemplate.html">
                            <div  id="{{parentId}}">
                                <div class="itemMenu" ng-repeat="item in model">
                                    <a href="{{item.href}}" data-toggle="collapse" data-parent="#{{parentId}}" data-target="#child{{$index}}" ng-click="model.selected = item">
                                        <i class="{{item.icone}}"></i>{{item.descricao_categoria_menu}}
                                        <span class="fa arrow fa-rotate-270 " ng-show="item.temFilho"></span>
                                    </a>
                                    <div id="child{{$index}}" ng-class="{'collapse':true}">
                                        <ul>
                                            <li ng-repeat="subitem in item.filhos">
                                                <a href="{{subitem.href}}">{{subitem.descricao}}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </script>
                        <accordion model="model" id="test"></accordion>
                        </ul>
                    </div>
                    <!-- /.sidebar-collapse -->
                </div>
                <!-- /.navbar-static-side -->
            </nav>

            <div id="page-wrapper">
                <div ng-view style="padding-top: 50px;"></div>
            </div>
            <!-- /#page-wrapper -->

        </div>
        <!-- /#wrapper -->