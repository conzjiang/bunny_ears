(function (root) {
  var Admin, Header, Add, LogOut;

  Admin = BunnyEars.Admin = BunnyEars.Admin || {};
  Add = Admin.Add;
  LogOut = Admin.LogOut;

  Header = Admin.Header = React.createClass({
    render: function () {
      return (
        <header className="admin-header">
          <a className="logo" href="/">Bunny Ears</a>
          <nav className="admin-nav">
            <Add addShows={this.props.addShows} />
            <button onClick={this.props.sort}>Sort</button>
            <LogOut />
          </nav>

          <input type="text"
                 onFocus={this.select}
                 onChange={this.props.filter}
                 placeholder="Filter shows" />
        </header>
      );
    },

    select: function (e) {
      e.currentTarget.select();
    }
  });
})(this);