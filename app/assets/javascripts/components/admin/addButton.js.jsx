(function () {
  var Add;

  Add = BunnyEars.Admin.Add = React.createClass({
    render: function () {
      return (
        <button>
          Add
          <ul className="selections">
            <li onClick={this.selectCategory}>popular</li>
            <li onClick={this.selectCategory}>on_the_air</li>
            <li onClick={this.selectCategory}>airing_today</li>
          </ul>
        </button>
      );
    },

    selectCategory: function (e) {
      this.props.addShows(e.currentTarget.innerHTML);
    }
  });
})();