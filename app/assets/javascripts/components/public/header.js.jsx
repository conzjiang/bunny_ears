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
          <a className="logo" href="/">Bunny Ears</a>
          <nav>
            <Nav switchForm={this.switchForm} />
            <section className={headerFormClass}>
              <RecommendForm accessKey={this.props.accessKey}
                             match={this.props.match} />
              <SearchForm filter={this.props.filter} />
            </section>
          </nav>
        </header>
      );
    },

    switchForm: function (form) {
      this.setState({ form: form });

      setTimeout(function () {
        $("." + form.toLowerCase()).find("input").focus();
      }, 0);
    }
  });
})(this);