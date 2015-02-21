(function (root) {
  var BunnyEars = root.BunnyEars = root.BunnyEars || {};

  var TvList = BunnyEars.TvList = React.createClass({
    saveImages: function (e) {
      e.preventDefault();
      var imageData = {};

      this.props.shows.forEach(function (show) {
        if (show.image_url) {
          imageData[show.id] = show.image_url;
        }
      });

      $.ajax({
        type: "put",
        url: "/tv_shows/update",
        data: { tv_show: imageData },
        success: function () {
          console.log("saved")
        }
      });
    },

    render: function () {
      var shows = this.props.shows.map(function (show) {
        return <TvShow show={show} key={show.id} />;
      });

      return (
        <form onSubmit={this.saveImages} encType="multipart/form-data">
          <ul>{shows}</ul>
          <button>Submit</button>
        </form>
      );
    }
  });

  var TvShow = BunnyEars.TvShow = React.createClass({
    previewImage: function (e) {
      var reader = new FileReader();
      var file = e.target.files[0];

      reader.onload = function (file) {
        this.setState({ image_url: file.target.result });
      }.bind(this);

      reader.readAsDataURL(file);
    },

    updateInput: function (e) {
      this.setState({ url: e.target.value });
    },

    printImage: function (e) {
      e.preventDefault();
      this.props.show.image_url = this.state.url;
      this.setState({ image_url: this.state.url });
    },

    getInitialState: function () {
      return { url: "", image_url: "" };
    },

    render: function () {
      var imageUrl;

      if (this.state.image_url) {
        imageUrl = <img src={this.state.image_url} />;
      } else {
        imageUrl = "";
      }

      return (
        <li>
          {this.props.show.title}
          {imageUrl}
          <input type="file" onChange={this.previewImage} />
          <input type="text"
                 value={this.state.url}
                 onChange={this.updateInput} />
          <button onClick={this.printImage}>Click</button>
        </li>
      );
    }
  });
})(this);