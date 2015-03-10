(function () {
  var listModalEl, removeClass, ListItem;

  listModalEl = BunnyEars.listModalEl;
  removeClass = BunnyEars.Utils.removeClass;

  ListItem = BunnyEars.ListItem = React.createClass({
    render: function () {
      return (
        <li onDragOver={this.highlightStatus}
            onDragLeave={this.unhighlightStatus}
            onClick={this.addToList}
            onDrop={this.addToList}
            className={this.props.className}>
          {this.props.status}
        </li>
      );
    },

    highlightStatus: function (e) {
      e.preventDefault();

      if (e.currentTarget.className.indexOf("highlight") === -1) {
        e.currentTarget.className += " highlight";
      }
    },

    unhighlightStatus: function (e) {
      removeClass(e.currentTarget, "highlight");
    },

    addToList: function (e) {
      e.preventDefault();
      var status = e.currentTarget.innerHTML,
          tvId = e.dataTransfer.getData("tvId");

      console.log(status, tvId);

      removeClass(document.body.querySelector(".drag"), "drag");
      this.unhighlightStatus(e);
      this.closeModal();
    },

    closeModal: function () {
      listModalEl.querySelector(".watchlist-statuses").style.top = "";
      document.body.className = "";
    }
  });
})();