angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  $scope.postValueRandom = function () {
    $http({
      method  : 'POST',
      url     : 'http://things.ubidots.com/api/v1.6/devices/ionic/Button-random/values?token=j8gMa3uY31XANe5BfpJJGaEJVTAKYIkadtHOTNM9sggNNMoZCpofIGc2qthY',
      data    : {'value': Math.floor((Math.random() * 100) + 1)} //forms user object
      //headers : {'Content-Type': 'application/json', 'X-Auth-Token': 'j8gMa3uY31XANe5BfpJJGaEJVTAKYIkadtHOTNM9sggNNMoZCpofIGc2qthY'} 
    }).success(function(data) {
      if (data.errors) {
        // Showing errors.
        console.log("Error posting")
        
      } else {
        $scope.valuePost = data.value;
        console.log("Post value")
      }
    });
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.do = function () {
    debugger
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $http) {
  $http({
    method : "GET",
    url: 'http://localhost:3001/',
    //url : "http://things.ubidots.com/api/v1.6/devices/ionic/Button-random/values?token=j8gMa3uY31XANe5BfpJJGaEJVTAKYIkadtHOTNM9sggNNMoZCpofIGc2qthY",
    headers: {'Content-Type': 'text/plain'}
  }).then(function mySucces(response) {
    debugger
    $scope.myWelcome = response.data;
  }, function myError(response) {
    $scope.myWelcome = response.statusText;
  });
});
