(function (root) {
  var BunnyEars, SearchForm;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};

  SearchForm = BunnyEars.SearchForm = React.createClass({
    getInitialState: function () {
      return { query: "" };
    },

    render: function () {
      return (
        <form className="search" onSubmit={this.doNothing}>
          <input type="text"
                 value={this.state.query}
                 onFocus={this.select}
                 onChange={this.search}
                 placeholder="Search all TV shows" />
        </form>
      );
    },

    doNothing: function (e) {
      e.preventDefault();
    },

    select: function (e) {
      e.target.select();
    },

    search: function (e) {
      var query = e.target.value;

      this.setState({ query: query });
      this.props.filter(query);
    }
  });
})(this);