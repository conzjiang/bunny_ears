(function (root) {
  var BunnyEars, RecommendForm;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};

  RecommendForm = BunnyEars.RecommendForm = React.createClass({
    getInitialState: function () {
      return { results: [] };
    },

    render: function () {
      var message = "I'm looking for a series like";
      var results = this.state.results.map(function (result) {
        return <li>{result}</li>;
      });

      return (
        <form onSubmit={this.recommend}>
          {message}
          <input type="text" ref="query" />
          <button>Find Me Something!</button>
        </form>
      );
    },

    recommend: function (e) {
      e.preventDefault();
      var query = this.refs.query.getDOMNode().value;

      $.ajax({
        type: "get",
        url: "http://www.tastekid.com/api/similar",
        data: { q: query, type: "show", k: this.props.accessKey },
        dataType: "jsonp",
        success: function (data) {
          var results = data.Similar.Results.map(function (result) {
            return result.Name;
          });

          this.props.match(results);
        }.bind(this)
      });
    }
  });
})(this);