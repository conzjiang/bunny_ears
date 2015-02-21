(function (root) {
  var BunnyEars = root.BunnyEars = root.BunnyEars || {};
  var Admin = BunnyEars.Admin = BunnyEars.Admin || {};

  var TvShow = Admin.TvShow = React.createClass({
    getInitialState: function () {
      return { url: "", image_url: "", title: "", editing: false };
    },

    componentDidMount: function () {
      this.setTitle(this.props.show.title);
    },

    setTitle: function (title) {
      this.setState({ title: title });
    },

    render: function () {
      var imageTag, title;
      var imageUrl = this.state.image_url || this.props.show.image_url;

      if (imageUrl) {
        imageTag = <img src={imageUrl} />;
      } else {
        imageTag = "";
      }

      if (this.state.editing) {
        title = (
          <form onSubmit={this.save}>
            <input type="text"
                   value={this.state.title}
                   onChange={this.updateTitle}
                   onBlur={this.save} />
          </form>
        );
      } else {
        title = <strong onDoubleClick={this.edit}>{this.state.title}</strong>;
      }

      return (
        <li>
          {title}
          {imageTag}
          <input type="file" onChange={this.previewImage} />
          <input type="text"
                 value={this.state.url}
                 onChange={this.updateInput} />
          <button onClick={this.printImage}>Click</button>
          <button onClick={this.deleteTv}>Delete</button>
        </li>
      );
    },

    updateTitle: function (e) {
      this.setTitle(e.target.value);
    },

    save: function (e) {
      e.preventDefault();

      $.ajax({
        type: "put",
        url: "admin/tv_shows/" + this.props.show.id,
        data: { tv_show: { title: this.state.title } },
        dataType: "json",
        success: function () {
          this.setState({ editing: false });
        }.bind(this)
      });
    },

    edit: function (e) {
      this.setState({ editing: true });
    },

    previewImage: function (e) {
      var reader = new FileReader();
      var file = e.target.files[0];

      reader.onload = function (file) {
        this.collectNewImage(file.target.result);
      }.bind(this);

      reader.readAsDataURL(file);
    },

    collectNewImage: function (newImage) {
      var imageData = {};
      imageData[this.props.show.id] = newImage;
      this.props.collect(imageData);
      this.setState({ image_url: newImage });
    },

    updateInput: function (e) {
      this.setState({ url: e.target.value });
    },

    printImage: function (e) {
      e.preventDefault();
      this.collectNewImage(this.state.url);
    },

    deleteTv: function () {
      this.props.destroy(this.props.show);
    }
  });
})(this);