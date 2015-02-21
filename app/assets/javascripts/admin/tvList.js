(function (root) {
  var BunnyEars, Admin, isEmpty, TvShow, TvList;
  var mark = JSON.parse($("#mark").html())[0],
      category = mark.category,
      counter = mark.counter;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};
  Admin = BunnyEars.Admin = BunnyEars.Admin || {};
  isEmpty = BunnyEars.Utils.isEmpty;
  TvShow = Admin.TvShow;

  TvList = Admin.TvList = React.createClass({
    getInitialState: function () {
      return { shows: [], errors: [] };
    },

    componentDidMount: function () {
      this.imageData = {};

      $.ajax({
        type: "get",
        url: "admin/tv_shows",
        dataType: "json",
        success: function (data) {
          this.setState({ shows: data.tv_shows });
          this.key = data.key;
        }.bind(this)
      });
    },

    render: function () {
      var shows = this.state.shows.map(function (show) {
        return <TvShow show={show} key={show.id} collect={this.collectImage} />;
      }.bind(this));

      var errors = this.state.errors.map(function (error) {
        return <li>{error}</li>;
      });

      return (
        <div>
          <button onClick={this.addShows}>Add TV shows</button>

          <ul>{errors}</ul>

          <form onSubmit={this.saveImages} encType="multipart/form-data">
            <ul>{shows}</ul>
            <button>Submit</button>
          </form>
        </div>
      );
    },

    collectImage: function (data) {
      for (var id in data) {
        this.imageData[id] = data[id];
      }
    },

    addShows: function () {
      $.ajax({
        type: "get",
        url: "http://api.themoviedb.org/3/tv/" + category,
        data: { api_key: this.key, page: counter },
        dataType: "json",
        success: function (data) {
          var serializedData = this.parseData(data.results);
          this.saveShows(serializedData);
        }.bind(this)
      });
    },

    parseData: function (data) {
      return data.map(function (tv) {
        return { tmdb_id: tv.id, title: tv.name };
      });
    },

    saveShows: function (data) {
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

    saveImages: function (e) {
      e.preventDefault();

      if (isEmpty(this.imageData)) return;

      $.ajax({
        type: "put",
        url: "admin/tv_shows/update",
        data: { tv_show: this.imageData },
        success: function () {
          console.log("saved")
        }
      });
    }
  });
})(this);