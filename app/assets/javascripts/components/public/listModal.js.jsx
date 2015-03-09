(function () {
  var STATUSES, ListItem, statusCodes, ListModal;

  STATUSES = BunnyEars.STATUSES;
  ListItem = BunnyEars.ListItem;

  statusCodes = {
    "Watching": "icon-pause",
    "Plan to Watch": "icon-play",
    "Completed": "icon-stop",
    "Dropped": "icon-to-end"
  };

  ListModal = BunnyEars.ListModal = React.createClass({
    render: function () {
      var statuses = STATUSES.map(function (status, i) {
        return <ListItem key={"status-" + i}
                         status={status}
                         className={statusCodes[status]} />;
      });

      return <ul className="watchlist-statuses group">{statuses}</ul>;
    }
  });

  ListModal.insideModal = function (e) {
    var modalTop = window.innerHeight * .3 + window.scrollY,
        itemSize = 135,
        modalHeight = itemSize + 20,
        modalWidth = itemSize * 4 + 20,
        modalLeft = window.innerWidth / 2 - modalWidth / 2,
        withinHeight = e.pageY >= modalTop && e.pageY <= modalTop + modalHeight,
        withinWidth = e.pageX >= modalLeft && e.pageX <= modalLeft + modalWidth;

    return withinHeight && withinWidth;
  };
})();