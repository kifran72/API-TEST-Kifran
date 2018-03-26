let app = angular.module("myApp", []);
 

app.controller("insertUsers", function ($scope, $http) {
    // GET API
    $http.get("http://api.dianophe.fr/test/users")
        .then(function Success(reponse) {
            reponse.data.forEach(user => {
                $scope.users.push(user);
            });
        })
        .catch(err => console.log(err));

    $scope.users = [];
    $scope.createUser = function (id, username, nbr_tickets, account_type, img_url) {  
        $http.post("http://localhost:3000/createUser",  { 
            id: id,
            username: username,
            nbr_tickets: nbr_tickets,
            account_type: account_type,
            img_url: img_url
        });
    }
});

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

