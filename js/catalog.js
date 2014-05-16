"use strict";

angular.module("Catalog", [
    "Filters"
  ])
  .service("CatalogService", function($http, $q, slugifyFilter) {
    var catalogPromise = $http.get("/catalog.json").then(function(response) {
      var obj = response.data;

      obj.getCategoryBySlug = function(slug) {
        return _.find(this.categories, function(cat) {
          return slugifyFilter(cat.name) == slug;
        });
      };

      obj.getProductBySlug = function(catSlug, prodSlug) {
        return _.find(this.getCategoryBySlug(catSlug).products, function(p) {
          return slugifyFilter(p.name) == prodSlug;
        });
      };

      obj.getProductById = function(id) {
        var products = _.flatten(this.categories, "products");
        return _.find(products, function(p) { return p.id == id; });
      };

      return obj;
    });

    this.fetchCatalog = function() {
      return catalogPromise;
    };
  })
