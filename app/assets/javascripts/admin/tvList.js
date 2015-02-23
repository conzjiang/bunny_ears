(function (root) {
  var isEmpty, Admin, TvShow, UploadButton, TvList;

  isEmpty = BunnyEars.Utils.isEmpty;
  Admin = BunnyEars.Admin;
  TvShow = Admin.TvShow;
  UploadButton = Admin.UploadButton;

  TvList = Admin.TvList = React.createClass({
    componentDidMount: function () {
      this.imageData = {};
    },

    render: function () {
      var shows = this.props.shows.map(function (show) {
        return <TvShow show={show}
                       key={show.id}
                       collect={this.collectImage}
                       deleteFromList={this.props.deleteFromList} />;
      }.bind(this));

      return (
        <div>
          <UploadButton upload={this.saveImages} />
          <ul className="admin">{shows}</ul>
          <UploadButton upload={this.saveImages} />
        </div>
      );
    },

    collectImage: function (data) {
      for (var id in data) {
        this.imageData[id] = data[id];
      }
    },

    saveImages: function (e) {
      var button;

      if (isEmpty(this.imageData)) return;
      button = e.target;
      button.disabled = true;
      button.innerHTML = "Uploading...";

      $.ajax({
        type: "put",
        url: "admin/tv_shows/update",
        data: { tv_show: this.imageData },
        success: function () {
          setTimeout(function () {
            button.disabled = false;
            button.innerHTML = "Upload Images";
          }, 1000);
        }
      });
    }
  });
})(this);