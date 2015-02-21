(function (root) {
  var BunnyEars, RecommendForm, SearchForm, TvList;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};
  RecommendForm = BunnyEars.RecommendForm;
  SearchForm = BunnyEars.SearchForm;
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
          <RecommendForm accessKey={this.state.key} match={this.match} />
          <SearchForm filter={this.filter} />
          <TvList shows={this.state.shows} />
        </div>
      );
    },

    match: function (results) {
      var shows = [];

      results.forEach(function (result) {
        var tv;

        this.state.initialShows.some(function (show) {
          if (show.title === result) {
            tv = show;
            return true;
          }
        });

        if (tv) {
          shows.push(tv);
        } else {
          this.createShow(result);
        }

      }.bind(this));

      this.setState({ shows: shows });
    },

    createShow: function (title) {
      $.ajax({
        type: "post",
        url: "api/tv_shows",
        data: { tv_show: { title: title } },
        dataType: "json",
        success: function (data) {
          this.setState({
            initialShows: this.state.initialShows.concat([data])
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