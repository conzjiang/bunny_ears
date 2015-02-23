(function (root) {
  var BunnyEars, TvShow;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};

  TvShow = BunnyEars.TvShow = React.createClass({
    render: function () {
      return (
        <li>
          {this.imageBlock()}
        </li>
      );
    },

    imageBlock: function () {
      var imageUrl;

      if (imageUrl = this.props.show.image_url) {
        return <img src={imageUrl} />;
      } else {
        return <strong className="block">{this.props.show.title}</strong>;
      }
    }
  });
})(this);