FoorumApp.controller('ShowMessageController', function ($scope, $routeParams, Api) {
    $scope.newReply = {};
    $scope.newReply.content = "";

    Api.getMessage($routeParams.id).success(function (message) {
        $scope.message = message;
    });

    $scope.addNewReply = function () {
        Api.addReply({content: $scope.newReply.content}, $scope.message.id).success(function (reply) {

            $scope.message.Replies.push(reply);
            $scope.newReply.content = "";
        });
    };
});
