(function (root) {
  var Utils;

  Utils = BunnyEars.Utils;

  Utils.isEmpty = function (obj) {
    return !Object.keys(obj).length;
  };
})(this);