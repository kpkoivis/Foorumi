FoorumApp.controller('UsersController', function ($scope, $location, Api) {
    $scope.login = function () {
        $scope.errorMessage = "";
        Api.login($scope.user)
                .success(function (user) {
                    console.log('Kirjautuminen onnistui!');
                    console.log(user);
                    $location.path('/topics');
                })
                .error(function () {
                    console.log('Kirjautuminen epäonnistui! Lisätään käyttäjälle virheilmoitus');
                    $scope.errorMessage = 'Väärä käyttäjätunnus tai salasana!';
                });
    };

    $scope.register = function () {
        $scope.errorMessage = "";
        if ($scope.newUser.password != $scope.passwordAgain) {
            $scope.errorMessage = 'Salasanat eivät täsmää.';
        } else {
            Api.register($scope.newUser)
                    .success(function (user) {
                        console.log('Rekisteröityminen onnistui!');
                        console.log(user);
                        $location.path('/topics');
                    })
                    .error(function () {
                        console.log('Rekisteröityminen epäonnistui! Lisätään käyttäjälle virheilmoitus');
                        $scope.errorMessage = 'Käyttäjätunnus on jo käytössä!';
                    });
        }
    };
});
