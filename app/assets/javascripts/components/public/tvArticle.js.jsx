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
              <strong>{this.years()}</strong>
              <p>{this.description()}</p>
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
    },

    years: function () {
      var endYear;

      if (this.props.show.start_year) {
        endYear = this.props.show.end_year || "present";
        return this.props.show.start_year + " - " + endYear;
      } else {
        return "";
      }
    },

    description: function () {
      var description;

      if (description = this.props.show.description) {
        return description;
      } else {
        return "No description provided yet. Come back later!";
      }
    }
  });
})();