let app = angular.module("myApp", []);

app.controller("insertUsers", function ($scope, $http) {

    // SCOPES
    $scope.users = [];

    // GET API
    $http.get("http://api.dianophe.fr/test/users")
        .then(function Success(reponse) {
            reponse.data.forEach(user => {
                $scope.users.push(user);
            });
        })
        .catch(err => console.log(err));

    $scope.createUser = function (id, username, nbr_tickets, account_type, img_url) {
        $http.post("http://localhost:3000/createUser", {
            id: id,
            username: username,
            nbr_tickets: nbr_tickets,
            account_type: account_type,
            img_url: img_url
        }).then(function Success(reponse) {
            $scope.users[id].message = reponse.data.message;
            console.log($scope.users);
        }).catch(err => console.log(err));
    }
});

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

