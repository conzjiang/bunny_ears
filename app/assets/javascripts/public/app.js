(function (root) {
  var BunnyEars, Header, TvList;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};
  Header = BunnyEars.Header;
  TvList = BunnyEars.TvList;

  App = BunnyEars.App = React.createClass({
    getInitialState: function () {
      return { initialShows: [], shows: [], key: "" };
    },

    componentDidMount: function () {
      $.ajax({
        type: "get",
        url: "api/tv_shows",
        dataType: "json",
        success: function (data) {
          this.setState({
            initialShows: data.tv_shows,
            shows: data.tv_shows,
            key: data.key
          });
        }.bind(this)
      });
    },

    render: function () {
      return (
        <div>
          <Header accessKey={this.state.key}
                  match={this.match}
                  filter={this.filter} />
          <TvList shows={this.state.shows} />
        </div>
      );
    },

    match: function (results) {
      var shows = [], newShows = [];

      results.forEach(function (result) {
        var tv;

        this.state.initialShows.some(function (show) {
          if (show.title.toLowerCase() === result.toLowerCase()) {
            tv = show;
            return true;
          }
        });

        if (tv) {
          shows.push(tv);
        } else {
          newShows.push(result);
        }
      }.bind(this));

      if (newShows.length) this.createShows(newShows);
      this.setState({ shows: shows });
    },

    createShows: function (titles) {
      var params = titles.map(function (title) {
        return { title: title };
      });

      $.ajax({
        type: "post",
        url: "api/tv_shows",
        data: { tv_show: params },
        dataType: "json",
        success: function (data) {
          this.setState({
            initialShows: this.state.initialShows.concat(data.tv_shows)
          });
        }.bind(this)
      });
    },

    filter: function (query) {
      var matchData = new RegExp(query, "i");

      var shows = this.state.initialShows.filter(function (tv) {
        return matchData.test(tv.title);
      });

      this.setState({ shows: shows });
    }
  });
})(this);