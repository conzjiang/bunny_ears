(function (root) {
  var Admin, TvShow, TvList;

  Admin = BunnyEars.Admin;
  TvShow = Admin.TvShow;

  TvList = Admin.TvList = React.createClass({
    componentDidMount: function () {
      this.imageData = {};
    },

    render: function () {
      var shows = this.props.shows.map(function (show) {
        return <TvShow show={show}
                       key={show.id}
                       collect={this.collectImage}
                       deleteFromList={this.deleteFromList} />;
      }.bind(this));

      return (
        <div>
          <button ref="submit" onClick={this.saveImages}>Upload</button>
          <ul className="group">{shows}</ul>
          <button ref="submit" onClick={this.saveImages}>Upload</button>
        </div>
      );
    },

    collectImage: function (data) {
      for (var id in data) {
        this.imageData[id] = data[id];
      }
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

    saveImages: function () {
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
            button.innerHTML = "Upload";
          }, 1000);
        }
      });
    }
  });
})(this);