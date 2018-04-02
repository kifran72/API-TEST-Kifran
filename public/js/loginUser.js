// initialisation de angular
let app = angular.module("myApp", []);

// Les scopes ne sont pas crées sur la page HTML il sont crées juste ici dans ce fichier et plus précisement dans le contrôleur
//
//
// récuperation du controller "loginUser" et des scope cree sur la page html
app.controller("loginUser", function($scope, $http, $window) {
    $scope.username, $scope.password;
    let username, password;

    // Création de la fonction loginUser pour permmettre l'envoie du username et password par la route crée "/login" et si la reponse de la route est true rediriger vers "/" sinon message d'erreur
    $scope.loginUser = function() {

        username = $scope.username;
        password = $scope.password;


        $http.post("http://localhost:3000/login", {
            username: username,
            password: password
        }).then(function(rep) {
            if (rep.data.success) {
                $window.location.href = '/';
            } else {
                console.log(rep);
                $('.erreurMessage').fadeIn(300);
            }
        })

    }
});






// User id: kifran72
// password: oFRt0ZoDg4