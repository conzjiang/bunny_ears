(function (root) {
  var BunnyEars, Utils;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};
  Utils = BunnyEars.Utils = {};

  Utils.isEmpty = function (obj) {
    return !Object.keys(obj).length;
  };
})(this);