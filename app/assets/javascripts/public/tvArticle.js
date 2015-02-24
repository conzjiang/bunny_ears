(function () {
  var TvArticle;

  TvArticle = BunnyEars.TvArticle = React.createClass({
    render: function () {
      return (
        <article className="group" onClick={this.doNothing}>
          <div className="wrapper">
            <div className="tv-left">{this.imageBlock()}</div>

            <div className="content-right">
              <h1>{this.props.show.title}</h1>
              <strong>
                {this.props.show.start_year}
                {"-"}
                {this.props.show.end_year || "present"}
              </strong>
              <p>{this.props.show.description}</p>
            </div>
          </div>
        </article>
      )
    },

    doNothing: function (e) {
      e.stopPropagation();
    },

    imageBlock: function () {
      var imageUrl;

      if (imageUrl = this.props.show.image_url) {
        return <img src={imageUrl} />;
      } else {
        return <div className="image-block" />;
      }
    }
  })
})();