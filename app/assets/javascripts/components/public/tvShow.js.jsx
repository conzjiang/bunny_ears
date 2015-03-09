(function (root) {
  var scrollTo, ellipsis, bindOuterClick, TvArticle, listModalEl, ListModal,
    closeOtherArticle, TvShow;

  scrollTo = BunnyEars.Utils.scrollTo;
  ellipsis = BunnyEars.Utils.ellipsis;
  bindOuterClick = BunnyEars.Utils.bindOuterClick;
  TvArticle = BunnyEars.TvArticle;
  listModalEl = BunnyEars.listModalEl;
  ListModal = BunnyEars.ListModal;

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
        <li onClick={this.expand}
            draggable="true"
            onDragStart={this.dragStart}>
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

    dragStart: function (e) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("tvId", this.props.show.id);
      e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
      this.openList(e);
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
        return <img ref="image" src={imageUrl} />;
      } else {
        return (
          <strong ref="image" className="block">
            {this.props.show.title}
          </strong>
        );
      }
    },

    openList: function (e) {
      var statusList;

      document.body.className = "open-modal";
      listModalEl.style.top = window.scrollY + "px";

      if (ListModal.insideModal(e)) {
        statusList = listModalEl.querySelector(".watchlist-statuses");
        statusList.style.top = e.pageY + 50 - window.scrollY + "px";
      }
    }
  });
})(this);