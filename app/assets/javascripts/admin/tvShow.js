(function (root) {
  var BunnyEars = root.BunnyEars = root.BunnyEars || {};
  var Admin = BunnyEars.Admin = BunnyEars.Admin || {};

  var TvShow = Admin.TvShow = React.createClass({
    getInitialState: function () {
      return { url: "", image_url: "", title: "", editing: false };
    },

    componentDidMount: function () {
      this.setTitle(this.props.show.title);
      this.setImage(this.props.show.image_url);
    },

    setTitle: function (title) {
      this.setState({ title: title });
    },

    setImage: function (url) {
      this.setState({ image_url: url });
    },

    render: function () {
      return (
        <li>
          {this.imageTag()}
          {this.title()}
          <form onSubmit={this.previewImage}>
            <input type="text"
                   value={this.state.url}
                   onChange={this.updateInput} />
            <button onClick={this.previewImage}>Preview</button>
          </form>

          <button onClick={this.deleteTv}>Delete</button>
        </li>
      );
    },

    imageTag: function () {
      var imageUrl;

      if (imageUrl = this.state.image_url) {
        return <img src={imageUrl} />;
      } else {
        return "";
      }
    },

    title: function () {
      if (this.state.editing) {
        return (
          <form onSubmit={this.save}>
            <input type="text"
                   value={this.state.title}
                   onChange={this.updateTitle}
                   onBlur={this.save} />
          </form>
        );
      } else {
        return <strong onDoubleClick={this.edit}>{this.state.title}</strong>;
      }
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
      var imageData = {};
      e.preventDefault();

      imageData[this.props.show.id] = this.state.url;
      this.props.collect(imageData);
      this.setImage(this.state.url);
    },

    updateInput: function (e) {
      this.setState({ url: e.target.value });
    },

    deleteTv: function () {
      $.ajax({
        type: "delete",
        url: "admin/tv_shows/" + this.props.show.id,
        dataType: "json",
        success: function () {
          this.props.deleteFromList(this.props.show);
        }.bind(this)
      });
    }
  });
})(this);