(function () {
  var listModalEl, ListItem;

  listModalEl = BunnyEars.listModalEl;

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
      var className = e.currentTarget.className,
          cutOffIndex = className.indexOf("highlight") - 1;

      e.currentTarget.className = className.slice(0, cutOffIndex);
    },

    addToList: function (e) {
      e.preventDefault();
      var status = e.currentTarget.innerHTML,
          tvId = e.dataTransfer.getData("tvId");

      console.log(status, tvId);
      this.unhighlightStatus(e);
      this.closeModal();
    },

    closeModal: function () {
      listModalEl.querySelector(".watchlist-statuses").style.top = "";
      document.body.className = "";
    }
  });
})();