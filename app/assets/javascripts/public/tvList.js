(function (root) {
  var BunnyEars, TvShow, TvList;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};
  TvShow = BunnyEars.TvShow;

  TvList = BunnyEars.TvList = React.createClass({
    render: function () {
      var shows = this.props.shows.map(function (tv) {
        return <TvShow show={tv} key={tv.id} />;
      });

      return <ul className="cards">{shows}</ul>;
    }
  });
})(this);