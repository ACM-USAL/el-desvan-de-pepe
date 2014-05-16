"use strict";

var scope;
angular.module("Shop", [
    "ngRoute",
    "Cart",
    "Catalog",
    "Filters",
    "Order"
  ])
  .config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    var resolveCatalog = function(CatalogService) {
      return CatalogService.fetchCatalog();
    };

    $routeProvider
      .when("/", {
        templateUrl: "/templates/categories.html",
        controller: "CategoriesCtrl",
        resolve: {
          catalog: resolveCatalog
        }
      })
      .when("/categorias/:catSlug/", {
        templateUrl: "/templates/category.html",
        controller: "CategoryCtrl",
        resolve: {
          catalog: resolveCatalog
        }
      })
      .when("/categorias/:catSlug/:prodSlug/", {
        templateUrl: "/templates/product.html",
        controller: "ProductCtrl",
        resolve: {
          catalog: resolveCatalog
        }
      })
      .when("/cesta/", {
        templateUrl: "/templates/cart.html",
        controller: "CartCtrl",
        resolve: {
          catalog: resolveCatalog
        }
      })
      .when("/confirmacion/", {
        templateUrl: "/templates/success.html",
      })
      .otherwise({
        templateUrl: "/templates/404.html"
      });
  })
  .controller("MainController", function($scope, CartService) {
    $scope.cart = CartService.cart;
  })
  .controller("CategoriesCtrl", function($scope, catalog) {
    $scope.categories = catalog.categories;
  })
  .controller("CategoryCtrl", function($scope, $routeParams, catalog) {
    $scope.orderProductsBy = "price";

    $scope.category = catalog.getCategoryBySlug($routeParams.catSlug);
  })
  .controller("ProductCtrl", function($scope, $routeParams, $location,
                                      CartService, catalog) {
    $scope.product = catalog.getProductBySlug($routeParams.catSlug,
                                              $routeParams.prodSlug);

    $scope.categoryName = catalog.getCategoryBySlug($routeParams.catSlug).name;
    $scope.categorySlug = $routeParams.catSlug;

    $scope.addToCart = function() {
      CartService.addToCart($scope.product.id);
      $location.url("/cesta/");
    }
  })
