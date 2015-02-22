(function (root) {
  var BunnyEars, Header;

  BunnyEars = root.BunnyEars = root.BunnyEars || {};
  Nav = BunnyEars.Nav;
  RecommendForm = BunnyEars.RecommendForm;
  SearchForm = BunnyEars.SearchForm;

  Header = BunnyEars.Header = React.createClass({
    getInitialState: function () {
      return { form: "Recommend" };
    },

    render: function () {
      var headerFormClass = "header-form " + this.state.form;

      return (
        <header>
          <Nav switchForm={this.switchForm} />
          <section className={headerFormClass}>
            <RecommendForm accessKey={this.props.accessKey}
                           match={this.props.match} />
            <SearchForm filter={this.props.filter} />
          </section>
        </header>
      );
    },

    switchForm: function (form) {
      this.setState({ form: form });
    }
  });
})(this);