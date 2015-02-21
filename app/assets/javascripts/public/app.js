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
          <RecommendForm accessKey={this.state.key} />
        </div>
      );
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