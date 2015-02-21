(function (root) {
  var BunnyEars, RecommendForm;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};

  RecommendForm = BunnyEars.RecommendForm = React.createClass({
    getInitialState: function () {
      return { query: "", results: [] };
    },

    render: function () {
      var message = "I'm looking for a series like";
      var results = this.state.results.map(function (result) {
        return <li>{result}</li>;
      });

      return (
        <form onSubmit={this.recommend}>
          {message}
          <input type="text" value={this.state.query} onChange={this.update} />
          <button>Find Me Something!</button>

          <ul>{results}</ul>
        </form>
      );
    },

    update: function (e) {
      this.setState({ query: e.target.value });
    },

    recommend: function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: "http://www.tastekid.com/api/similar",
        data: { q: this.state.query, type: "show", k: this.props.accessKey },
        dataType: "jsonp",
        success: function (data) {
          var results = data.Similar.Results.map(function (result) {
            return result.Name;
          });

          this.setState({ results: results });
        }.bind(this)
      });
    }
  });
})(this);