(function (root) {
  var BunnyEars, SearchForm;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};

  SearchForm = BunnyEars.SearchForm = React.createClass({
    getInitialState: function () {
      return { query: "" };
    },

    render: function () {
      return (
        <form>
          <input type="text" value={this.state.query} onChange={this.search} />
        </form>
      );
    },

    search: function (e) {
      var query = e.target.value;

      this.setState({ query: query });
      this.props.filter(query);
    }
  });
})(this);