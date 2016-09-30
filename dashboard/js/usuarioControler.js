angular.module("every").service("usuarioAPI", function ($http, $cookies) {

    this.getUsuario = function () {
        return this.usuario;
    };

    this.usuario = {
        'email': $cookies.get('user'),
        'token': $cookies.get('token')
    };
});