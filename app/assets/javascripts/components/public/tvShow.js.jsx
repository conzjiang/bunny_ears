(function (root) {
  var scrollTo, ellipsis, bindOuterClick, TvArticle, closeOtherArticle, TvShow;

  scrollTo = BunnyEars.Utils.scrollTo;
  ellipsis = BunnyEars.Utils.ellipsis;
  bindOuterClick = BunnyEars.Utils.bindOuterClick;
  TvArticle = BunnyEars.TvArticle;

  closeOtherArticle = function () {
    var expandedEl;

    if (expandedEl = document.querySelector(".expand")) {
      $(window).off("resize");
      expandedEl.className = "";
    }
  };

  TvShow = BunnyEars.TvShow = React.createClass({
    render: function () {
      return (
        <li onClick={this.expand}>
          <div className="image-wrapper">{this.imageBlock()}</div>
          <TvArticle show={this.props.show} />
        </li>
      );
    },

    expand: function (e) {
      if (this.expanded) {
        this.closeArticle();
        return;
      }

      closeOtherArticle();
      this.openArticle();
      this.setUpEvents();
    },

    openArticle: function () {
      this.expanded = true;
      this.getDOMNode().className = "expand";
    },

    closeArticle: function () {
      this.expanded = false;
      this.getDOMNode().className = "";
    },

    setUpEvents: function () {
      var el = this.getDOMNode();

      scrollTo(el);
      ellipsis(el.querySelector(".content-right"));

      bindOuterClick({
        isOutside: function (target) {
          return !$(target).closest(".expand").length;
        },
        closeEl: this.closeArticle
      });
    },

    imageBlock: function () {
      var imageUrl;

      if (imageUrl = this.props.show.image_url) {
        return <img src={imageUrl} />;
      } else {
        return <strong className="block">{this.props.show.title}</strong>;
      }
    }
  });
})(this);