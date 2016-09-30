

<?php
session_start();

$cookie_name  = 'user';
    
if(!isset($_COOKIE[$cookie_name])) {
   // echo "Cookie named '" . $cookie_name . "' is not set!";
    header("location: /every/admin/");
} else {
  //  echo "Cookie '" . $cookie_name . "' is set!<br>";
  //  echo "Value is: " . $_COOKIE[$cookie_name];


}

?>


<!DOCTYPE html>
<html ng-app= "every">

<head>

    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Every - Area Administrativa</title>

    <!-- Bootstrap Core CSS -->
    <link href="../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Timeline CSS -->
    <link href="../dist/css/timeline.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet">
    


    <!-- Angular UI Grid Css -->
    <link rel="styleSheet" href="../bower_components/angular-ui-grid/ui-grid.min.css"/>


    <!-- Morris Charts CSS -->
    <!--<link href="../bower_components/morrisjs/morris.css" rel="stylesheet">-->

    <!-- Custom Fonts -->
    <link href="../bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" type="text/css"  href="../bower_components/toastr/toastr.css"/>

    <link rel="stylesheet" type="text/css" href="../bower_components/ng-img-crop/compile/minified/ng-img-crop.css" />

    <link href="../dist/css/jquery.dataTables.min.css" rel="stylesheet">
    <link href="../dist/css/style.css" rel="stylesheet" />
    

</head>

<body ng-controller="every">
    <div ng-include="pagina"></div>
    
      <!-- jQuery -->
    <script src="../bower_components/jquery/dist/jquery.min.js"></script>
    <script src="../js/jquery.dataTables.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="../bower_components/metisMenu/dist/metisMenu.min.js"></script>

    <!-- Morris Charts JavaScript -->
    <!--<script src="../bower_components/raphael/raphael-min.js"></script> -->
    <!--<script src="../bower_components/morrisjs/morris.min.js"></script> -->
    <!--<script src="../js/morris-data.js"></script> -->



     <script src="../bower_components/highcharts/highcharts.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="../dist/js/sb-admin-2.js"></script>
    

    <script src="../bower_components/angular/angular.min.js"></script>
    <script src="../js/angular-resource.js"></script>
    <script src="../js/angular-datatables.min.js"></script>
    <script src="../js/angular-datatables.scroller.min.js"></script>

    

    <script src="../bower_components/angular-cookies/angular-cookies.js"></script>
    <script src="../bower_components/angular-route/angular-route.min.js"></script>
    <script src="../bower_components/angular-ui-grid/ui-grid.min.js"></script>
    <script src="../bower_components/toastr/toastr.min.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.2.15/angular-locale_pt-br.js"></script>-->

    
    <script src='../bower_components/ngMask/dist/ngMask.min.js'></script>
    <script src="../dist/js/checklist-model.js"></script>

    <script src="../bower_components/ng-file-upload/ng-file-upload-all.min.js"></script>
    
    <base href="/every/admin/dashboard/pages/" />

    
    <!-- Custom Theme JavaScript -->
    <script src="../js/app.js"></script>


    <!-- Services-->

    <script src="../js/usuarioControler.js"></script>
    
    <script src="../js/controller/meuPerfil.js"></script>
    <script src="../js/controller/dashboard.js"></script>
    
    <script src="../js/controller/loja/categoriaProduto.js"></script>
    <script src="../js/controller/loja/eventosController.js"></script>

    <script src="../js/controller/configuracao/configuracaoContrato.js"></script>
    <script src="../js/controller/configuracao/configuracaoEstadoCivil.js"></script>
    <script src="../js/controller/configuracao/configuracaoOrientacaoSexualController.js"></script>
    <script src="../js/controller/configuracao/configuracaoPais.js"></script>
    <script src="../js/controller/configuracao/configuracaoEstado.js"></script>
    <script src="../js/controller/configuracao/configuracaoCidade.js"></script>
    <script src="../js/controller/configuracao/configuracaoEstiloBalada.js"></script>
    
    <script src="../js/controller/musicas/musicas.js"></script>
    <script src="../js/controller/cameras/cameras.js"></script>

    <script src="../js/controller/taxi/taxiCooperativas.js"></script>
    <script src="../js/controller/taxi/operadoraTaxi.js"></script>
      

    


    
    
    <script src="../bower_components/angular-input-masks/angular-input-masks-standalone.min.js"></script>
    <script src="../bower_components/moment/moment.js"></script>
    <script src="../bower_components/moment-timezone/builds/moment-timezone-with-data.min.js"></script>
    <script src="../bower_components/angular-momentjs/angular-momentjs.min.js"></script>

    <script src="../bower_components/angular-input-masks/angular-input-masks-standalone.min.js"></script>
    <script src="../bower_components/angular-input-masks/angular-input-masks-dependencies.js"></script>

    <script src="../../bower_components/jquery.inputmask/dist/jquery.inputmask.bundle.js"></script>

    <script src="../bower_components/ng-file-upload/ng-file-upload-shim.min.js"></script>
    <script src="../bower_components/ng-file-upload/ng-file-upload.min.js"></script>
    <script src="../bower_components/ng-img-crop/compile/minified/ng-img-crop.js"></script>
    

    <script src="https://code.highcharts.com/modules/data.js"></script>
<script src="https://code.highcharts.com/modules/drilldown.js"></script>


    <link rel="stylesheet" href="../../bower_components/fullcalendar/dist/fullcalendar.css"/>
<!-- jquery, moment, and angular have to get included before fullcalendar 
<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="bower_components/moment/min/moment.min.js"></script>
<script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
-->

    <script type="text/javascript" src="../../bower_components/angular-ui-calendar/src/calendar.js"></script>
    <script type="text/javascript" src="../../bower_components/fullcalendar/dist/fullcalendar.min.js"></script>
    <script type="text/javascript" src="../../bower_components/fullcalendar/dist/gcal.js"></script>
    <script type="text/javascript" src="../../bower_components/fullcalendar/dist/lang/pt-br.js"></script>


<link href="../bower_components/angular-xeditable/dist/css/xeditable.css" rel="stylesheet">
<script src="../bower_components/angular-xeditable/dist/js/xeditable.js"></script>


<!-- Firebase -->
<script src="https://cdn.firebase.com/js/client/2.2.4/firebase.js"></script>
<!-- AngularFire -->
<script src="https://cdn.firebase.com/libs/angularfire/1.2.0/angularfire.min.js"></script>

</body>

</html>

