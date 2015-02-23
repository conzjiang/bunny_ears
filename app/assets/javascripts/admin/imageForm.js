(function () {
  var Admin, ImageForm;

  Admin = BunnyEars.Admin;

  ImageForm = Admin.ImageForm = React.createClass({
    render: function () {
      return (
        <form onSubmit={this.previewImage}>
          <input className="image-url"
                 type="text"
                 ref="url"
                 placeholder="Image URL" />
          <button>Preview</button>
        </form>
      );
    },

    previewImage: function (e) {
      e.preventDefault();
      this.props.setImage(this.refs.url.getDOMNode().value);
    },
  });
})();