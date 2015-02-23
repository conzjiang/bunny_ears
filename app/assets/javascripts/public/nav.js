(function (root) {
  var Nav;

  Nav = BunnyEars.Nav = React.createClass({
    getInitialState: function () {
      return { recommendClass: "selected", searchClass: "" };
    },

    render: function () {
      return (
        <ul className="group">
          <li>
            <a className={this.state.recommendClass}
               onClick={this.setForm}
               href="#">Recommend</a>
          </li>
          <li>
            <a className={this.state.searchClass}
               onClick={this.setForm}
               href="#">Search</a>
          </li>
        </ul>
      );
    },

    setForm: function (e) {
      e.preventDefault();
      this.selectLink();
      this.props.switchForm(e.target.innerHTML);
    },

    selectLink: function () {
      var recommend = this.state.recommendClass,
          search = this.state.searchClass;

      this.setState({ recommendClass: search, searchClass: recommend });
    }
  });
})(this);