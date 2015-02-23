(function () {
  var Admin, UploadButton;

  Admin = BunnyEars.Admin;

  UploadButton = Admin.UploadButton = React.createClass({
    render: function () {
      return (
        <div className="button-wrapper">
          <button onClick={this.props.upload}>Upload Images</button>
        </div>
      );
    }
  });
})();