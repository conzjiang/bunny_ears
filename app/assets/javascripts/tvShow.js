(function (root) {
  var BunnyEars, App, SearchForm, TvList, TvShow;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};

  App = BunnyEars.App = React.createClass({
    getInitialState: function () {
      return { initialShows: [], shows: [] };
    },

    componentDidMount: function () {
      $.ajax({
        type: "get",
        url: "api/tv_shows",
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
      return (
        <div>
          <SearchForm filter={this.filter} />
          <TvList shows={this.state.shows} />
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

  SearchForm = BunnyEars.SearchForm = React.createClass({
    getInitialState: function () {
      return { query: "" };
    },

    render: function () {
      return (
        <form>
          <input type="text" value={this.state.query} onChange={this.search} />
        </form>
      );
    },

    search: function (e) {
      var query = e.target.value;

      this.setState({ query: query });
      this.props.filter(query);
    }
  });

  TvList = BunnyEars.TvList = React.createClass({
    render: function () {
      var shows = this.props.shows.map(function (tv) {
        return <TvShow show={tv} key={tv.id} />;
      });

      return <ul>{shows}</ul>;
    }
  });

  TvShow = BunnyEars.TvShow = React.createClass({
    render: function () {
      return <li>{this.props.show.title}</li>;
    }
  });
})(this);