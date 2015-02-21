(function (root) {
  var BunnyEars, TvShow;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};

  TvShow = BunnyEars.TvShow = React.createClass({
    render: function () {
      return (
        <li>{this.props.show.title}</li>
      );
    }
  });
})(this);