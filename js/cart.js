"use strict";

angular.module("Cart", [
  ])
  .service("CartService", function($rootScope) {
    var cartStr = localStorage.getItem("cart");
    if (cartStr !== null) {
      this.cart = JSON.parse(cartStr);
    } else {
      this.cart = [];
    }

    $rootScope.$watch(function() {
      return this.cart;
    }.bind(this), function(newValue, oldValue) {
      if (newValue != oldValue) {
        localStorage.setItem("cart", JSON.stringify(newValue));
      }
    }, true);

    this.findInCart = function(prodId) {
      return _.find(this.cart, function(i) {
        return i.prodId == prodId;
      });
    };

    this.addToCart = function(prodId) {
      var item = this.findInCart(prodId);
      if (item) {
        item.quantity += 1;
      } else {
        this.cart.push({
          prodId: prodId,
          quantity: 1
        })
      }
    };

    this.removeFromCart = function(prodId) {
      _.remove(this.cart, function(i) { 
        return i.prodId == prodId; 
      });
    };

    this.resetCart = function() {
      this.cart.splice(0, this.cart.length);
    };
  })
  .controller("CartCtrl", function($scope, CartService, catalog) {
    $scope.cart = CartService.cart;

    $scope.removeFromCart = bind(CartService, "removeFromCart");
    $scope.getProductInfo = bind(catalog, "getProductById");

    $scope.shippingFee = 10;
    $scope.getCartTotal = function() {
      return _.reduce($scope.cart, function(a, item) {
        var prod = catalog.getProductById(item.prodId);
        return a + prod.price * item.quantity;
      }, 0);
    }
  })
