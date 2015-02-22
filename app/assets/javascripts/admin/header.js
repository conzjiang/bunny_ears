(function (root) {
  var Admin, Header, LogOut;

  Admin = BunnyEars.Admin = BunnyEars.Admin || {};
  LogOut = Admin.LogOut;

  Header = Admin.Header = React.createClass({
    render: function () {
      return (
        <header>
          <nav className="admin">
            <a className="logo" href="/">Bunny Ears</a>
            <button onClick={this.addShows}>Add</button>
            <button onClick={this.props.sort}>Sort</button>
            <LogOut />
          </nav>

          <input type="text" onChange={this.props.filter} />
        </header>
      );
    },

    addShows: function () {
      $.ajax({
        type: "get",
        url: "http://api.themoviedb.org/3/tv/" + category,
        data: { api_key: this.key, page: counter },
        dataType: "json",
        success: function (data) {
          var serializedData = this.parseData(data.results);
          this.props.createShows(serializedData);
        }.bind(this)
      });
    },

    parseData: function (data) {
      return data.map(function (tv) {
        return { tmdb_id: tv.id, title: tv.name };
      });
    }
  });
})(this);