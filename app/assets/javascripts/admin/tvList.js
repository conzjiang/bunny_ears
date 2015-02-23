(function (root) {
  var isEmpty, Admin, TvShow, UploadButton, TvList;

  isEmpty = BunnyEars.Utils.isEmpty;
  disable = BunnyEars.Utils.disable;
  enable = BunnyEars.Utils.enable;
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
      $.extend(this.imageData, data);
    },

    saveImages: function (e) {
      var button;

      if (isEmpty(this.imageData)) return;
      button = e.target;
      disable(button, "Uploading...");

      $.ajax({
        type: "put",
        url: "admin/tv_shows/update",
        data: { tv_show: this.imageData },
        success: function () {
          enable(button, "Upload Images");
        }
      });
    }
  });
})(this);