(function (root) {
  var isEmpty, Header, TvList, Dashboard;
  var mark = JSON.parse($("#mark").html())[0],
      category = mark.category,
      counter = mark.counter;

  isEmpty = BunnyEars.Utils.isEmpty;
  Header = BunnyEars.Admin.Header;
  TvList = BunnyEars.Admin.TvList;

  Dashboard = BunnyEars.Admin.Dashboard = React.createClass({
    getInitialState: function () {
      return { initialShows: [], shows: [], errors: [] };
    },

    componentDidMount: function () {
      $.ajax({
        type: "get",
        url: "admin/tv_shows",
        dataType: "json",
        success: function (data) {
          this.setState({
            initialShows: data.tv_shows,
            shows: data.tv_shows
          });

          this.key = data.key;
        }.bind(this)
      });
    },

    render: function () {
      var errors = this.state.errors.map(function (error) {
        return <li>{error}</li>;
      });

      return (
        <div>
          <Header createShows={this.createShows}
                  sort={this.sort}
                  filter={this.filter} />
          <ul>{errors}</ul>
          <TvList shows={this.state.shows} />
        </div>
      );
    },

    createShows: function (data) {
      var newMark = {
        category: category,
        counter: ++counter
      };

      $.ajax({
        type: "post",
        url: "admin/tv_shows",
        data: { tv_show: data, mark: newMark },
        dataType: "json",
        success: function (data) {
          this.setState({
            shows: data.tv_shows,
            errors: data.errors
          });
        }.bind(this),
        errors: function () {
          this.setState({ errors: ["Fail"] });
        }
      });
    },

    sort: function () {
      var sortedShows = this.state.shows.sort(function (tv1, tv2) {
        if (tv1.title > tv2.title) {
          return 1;
        } else {
          return -1;
        }
      });

      this.setState({ shows: sortedShows });
    },

    filter: function (e) {
      var query = e.target.value;
      var matchData = new RegExp(query, "i");

      var shows = this.state.initialShows.filter(function (tv) {
        return matchData.test(tv.title);
      });

      this.setState({ shows: shows });
    },

  });
})(this);