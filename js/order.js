"use strict";

angular.module("Order", ["Cart"])
  .controller("OrderCtrl", function($scope, $http, $location, CartService) {
    $scope.name = "";
    $scope.surname = "";
    $scope.address = "";

    $scope.sending = false;

    $scope.confirmOrder = function() {
      var order = {
        name: $scope.name,
        surname: $scope.surname,
        address: $scope.address,
        cart: CartService.cart
      };

      $http.post("/send-order/", order).then(function() {
        $location.url("/confirmacion/");
        CartService.resetCart();
      }, function(reason) {
        alert("Ocurrió un error.");
        console.error(reason);
      }).finally(function() {
        $scope.sending = false;
      });

      $scope.sending = true;
    };    
  })
