(function (root) {
  var Utils, setDisabled, totalHeight, ellipse;

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

  Utils.scrollTo = function (el) {
    $("body").animate({
      scrollTop: $(el).offset().top - 10 + "px"
    }, "fast");
  };

  totalHeight = function ($els) {
    var sum = 0;

    $els.each(function () {
      if ($(this).hasClass("ignore")) return;
      sum += $(this).outerHeight(true);
    });

    return sum;
  };

  ellipse = function (el, resized) {
    var $lastChild, $el = $(el);

    $lastChild = $el.children(":not(.ignore)").last();
    el.originalText = el.originalText || $lastChild.text();

    while (resized || (totalHeight($el.children()) > $el.height())) {
      $lastChild.text(function (i, text) {
        if (resized) {
          resized = false;
          return el.originalText;
        }

        return text.replace(/\W*\s(\S)*$/, '...');
      });
    }
  };

  Utils.ellipsis = function (el) {
    if ($(el).hasClass("ignore")) return;
    ellipse(el)

    $(window).on("resize", ellipse.bind(null, el, true));
  };

  Utils.bindOuterClick = function (options) {
    var isOutside = options.isOutside, closeEl = options.closeEl;

    $("body").on("click", function (e) {
      if (isOutside(e.target)) {
        closeEl();
        $("body").off("click");
      }
    });
  };
})(this);