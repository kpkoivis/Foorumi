FoorumApp.controller('ShowTopicController', function($scope, $routeParams, $location, Api) {
    $scope.newMessage = {};
    $scope.newMessage.title = "";
    $scope.newMessage.content = "";
    
    Api.getTopic($routeParams.id).success(function(topic){
        $scope.topic = topic;
    });
    
    $scope.addNewMessage = function () {
        Api.addMessage({title: $scope.newMessage.title, content: $scope.newMessage.content} , $scope.topic.id).success(function(message) {
            $location.path('/messages/' + message.id);
        });
    };
});
