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
      return { initialShows: [], shows: [], errors: [] };
    },

    componentDidMount: function () {
      this.imageData = {};

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
      var shows = this.state.shows.map(function (show) {
        return <TvShow show={show}
                       key={show.id}
                       collect={this.collectImage}
                       destroy={this.destroyTv} />;
      }.bind(this));

      var errors = this.state.errors.map(function (error) {
        return <li>{error}</li>;
      });

      return (
        <div>
          <button onClick={this.addShows}>Add TV shows</button>
          <button onClick={this.sort}>Sort</button>
          <input type="text" onChange={this.filter} />
          <ul>{errors}</ul>
          <ul className="group">{shows}</ul>
          <button onClick={this.saveImages} ref="submit">Submit</button>
        </div>
      );
    },

    collectImage: function (data) {
      for (var id in data) {
        this.imageData[id] = data[id];
      }
    },

    destroyTv: function (tv) {
      $.ajax({
        type: "delete",
        url: "admin/tv_shows/" + tv.id,
        dataType: "json",
        success: function () {
          this.deleteFromList(tv);
        }.bind(this)
      });
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

    saveImages: function (e) {
      var button;

      if (isEmpty(this.imageData)) return;
      button = this.refs.submit.getDOMNode();
      button.disabled = true;
      button.innerHTML = "Uploading...";

      $.ajax({
        type: "put",
        url: "admin/tv_shows/update",
        data: { tv_show: this.imageData },
        success: function () {
          setTimeout(function () {
            button.disabled = false;
            button.innerHTML = "Submit";
          }, 1000);
        }
      });
    }
  });
})(this);