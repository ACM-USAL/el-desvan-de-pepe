angular.module("Filters", [])
  .filter("slugify", function() {
    return function(name) {
      return name.toLowerCase().replace(/ /g, "-");
    };
  })
  .filter("euro", function() {
    return function(input) {
      return parseFloat(input).toFixed(2).replace(".", ",") + " €";
    };
  });
