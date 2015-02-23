(function (root) {
  var Utils, setButton;

  Utils = BunnyEars.Utils;

  Utils.isEmpty = function (obj) {
    return !Object.keys(obj).length;
  };

  setDisabled = function (button, disabled, text) {
    button.disabled = disabled;
    button.innerHTML = text;
  };

  Utils.disable = function (button, text) {
    setDisabled(button, true, text);
  };

  Utils.enable = function (button, text) {
    setDisabled(button, false, text);
  };
})(this);