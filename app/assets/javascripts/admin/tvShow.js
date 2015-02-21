(function (root) {
  var BunnyEars = root.BunnyEars = root.BunnyEars || {};
  var Admin = BunnyEars.Admin = BunnyEars.Admin || {};

  var TvShow = Admin.TvShow = React.createClass({
    getInitialState: function () {
      return { url: "", image_url: "" };
    },

    render: function () {
      var imageTag;
      var imageUrl = this.state.image_url || this.props.show.image_url;

      if (imageUrl) {
        imageTag = <img src={imageUrl} />;
      } else {
        imageTag = "";
      }

      return (
        <li>
          {this.props.show.title}
          {imageTag}
          <input type="file" onChange={this.previewImage} />
          <input type="text"
                 value={this.state.url}
                 onChange={this.updateInput} />
          <button onClick={this.printImage}>Click</button>
        </li>
      );
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
    }
  });
})(this);