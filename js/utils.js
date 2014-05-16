function bind(obj, functionName) {
  return function() {
    return obj[functionName].apply(obj, arguments);
  }
}
