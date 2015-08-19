angular.module('starter.services', [])


.factory('QuestionFactory', ['$firebaseArray', function($firebaseArray) {
  var itemRef =  new Firebase('https://studymemoria.firebaseio.com/MyStudies');
  return $firebaseArray(itemRef);
}])

.factory('PointsFactory', ['$firebaseObject', function($firebaseObject) {
  var itemRef =  new Firebase('https://studymemoria.firebaseio.com/Points/user_points');
  return $firebaseObject(itemRef);
}])

.factory('PowerFactory', ['$firebaseObject', function($firebaseObject) {
  var itemRef =  new Firebase('https://studymemoria.firebaseio.com/Points/knomi_power');
  return $firebaseObject(itemRef);
}])

.service('ModalService', function($ionicModal, $rootScope) {


  var init = function(tpl, $scope) {

    var promise;
    $scope = $scope || $rootScope.$new();

    promise = $ionicModal.fromTemplateUrl(tpl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      return modal;
    });

    $scope.openModal = function() {
       $scope.modal.show();
     };
     $scope.closeModal = function() {
       $scope.modal.hide();
     };
     $scope.$on('$destroy', function() {
       $scope.modal.remove();
     });

    return promise;
  };

  return {
    init: init
  };

})


.factory('foodFactory', function(){
  var availableFoods = [{
    id: 0,
    name: 'milk',
    location: './img/milk.png'
  }, {
    id: 1,
    name: 'salmon',
    location: './img/salmon.png'
  }];

  var food = [];

  return {
    food: function() {
      return food;
    },
    addFood: function() {
      var randomFood = availableFoods[Math.floor(Math.random() * availableFoods.length)]
      food.push(randomFood)
    },
    removeFood: function() {
      food.pop()
    }
  };
})

.factory('timerFactory', function(){

  var time_array = [ 0, 5, 25, 120, 600, 3600];

  return {
    addTime: function (questionId) {
      var intervalRef = new Firebase('https://studymemoria.firebaseio.com/MyStudies/'+ questionId + '/interval');
      intervalRef.transaction(function(current_value) {
        var i = time_array.indexOf(current_value);
        return (current_value = time_array[i + 1]);
      });
    },
    minusTime: function (questionId) {
      var intervalRef = new Firebase('https://studymemoria.firebaseio.com/MyStudies/'+ questionId + '/interval');
      intervalRef.transaction(function(current_value) {
        var i = time_array.indexOf(current_value);
        if (current_value > 5) {
          return (current_value = time_array[i - 1]);
        } else {
          return current_value = 5;
        }
      });
    },
    addNotificationTime: function(time) {
      var newTime = time_array.indexOf(time) + 1;
      return time_array[newTime];
    },
    minusNotificationTime: function(time) {
      if (time > 5) {
      var newTime = time_array.indexOf(time) - 1;
    } else {
      var newTime = 1;
    }
      return time_array[newTime]
    }
  };

})

.factory('DataFormatting', function() {

  return {
    capitalizeFirstLetter: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    addQuestionMark: function(string) {
      if(string.slice(-1) !== "?") {
        return string + "?"
      }
    }
  };
})
