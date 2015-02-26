(function (root) {
  var Header, TvList, Dashboard;

  Header = BunnyEars.Admin.Header;
  TvList = BunnyEars.Admin.TvList;

  Dashboard = BunnyEars.Admin.Dashboard = React.createClass({
    getInitialState: function () {
      return { initialShows: [], shows: [], errors: [] };
    },

    componentDidMount: function () {
      this.marks = JSON.parse($("#mark").html())[0];

      $.ajax({
        type: "get",
        url: "admin/tv_shows",
        dataType: "json",
        success: function (data) {
          this.setState({
            initialShows: data.tv_shows,
            shows: data.tv_shows
          });

          this.accessKey = data.key;
        }.bind(this)
      });
    },

    render: function () {
      var errors = this.state.errors.map(function (error, i) {
        return <li key={"error" + i}>{error}</li>;
      });

      return (
        <div>
          <Header addShows={this.addShows}
                  sort={this.sort}
                  filter={this.filter} />
          <ul className="errors">{errors}</ul>
          <TvList shows={this.state.shows}
                  deleteFromList={this.deleteFromList} />
        </div>
      );
    },

    addShows: function (category) {
      var counter = this.marks[category] || 1;
      var newMark = {};
      newMark[category] = counter;

      $.ajax({
        type: "get",
        url: "https://api.themoviedb.org/3/tv/" + category,
        data: { api_key: this.accessKey, page: counter },
        dataType: "json",
        success: function (data) {
          var serializedData = this.parseData(data.results);
          this.createShows({
            tv_show: serializedData,
            mark: newMark
          });
        }.bind(this)
      });
    },

    parseData: function (data) {
      return data.map(function (tv) {
        return { tmdb_id: tv.id, title: tv.name };
      });
    },

    createShows: function (tvData) {
      $.ajax({
        type: "post",
        url: "admin/tv_shows",
        data: tvData,
        dataType: "json",
        success: function (data) {
          this.setState({
            initialShows: data.tv_shows,
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

    deleteFromList: function (tv) {
      var newState = {};

      ["initialShows", "shows"].forEach(function (key) {
        var list = this.state[key];
        var index = list.indexOf(tv);
        list.splice(index, 1);
        newState[list] = list;
      }.bind(this));

      this.setState(newState);
    }
  });
})(this);