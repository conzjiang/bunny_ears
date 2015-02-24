(function (root) {
  var isEmpty, disable, enable, Admin, Editable, ImageForm, TvShow;

  isEmpty = BunnyEars.Utils.isEmpty;
  Admin = BunnyEars.Admin;
  Editable = Admin.Editable;
  ImageForm = Admin.ImageForm;

  TvShow = Admin.TvShow = React.createClass({
    getInitialState: function () {
      return { image_url: "" };
    },

    componentDidMount: function () {
      this.setState({
        image_url: this.props.show.image_url
      });
    },

    render: function () {
      // componentDidMount to run only after show is fetched
      var editable;
      if (!isEmpty(this.props.show)) {
        editable = <Editable show={this.props.show} />;
      }

      return (
        <li className="group">
          {this.imageTag()}

          <article className="content">
            {editable}
            <ImageForm setImage={this.setImage} />
            <button className="delete" onClick={this.deleteTv}>Delete</button>
          </article>
        </li>
      );
    },

    imageTag: function () {
      var imageUrl;

      if (imageUrl = this.state.image_url) {
        return <img src={imageUrl} />;
      } else {
        return <div className="block"></div>;
      }
    },

    setImage: function (imageUrl) {
      var imageData = {};
      imageData[this.props.show.id] = imageUrl;
      this.props.collect(imageData);
      this.setState({ image_url: imageUrl });
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
