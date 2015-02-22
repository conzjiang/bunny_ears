(function () {
  var Admin, LogOut;

  Admin = BunnyEars.Admin;

  LogOut = Admin.LogOut = React.createClass({
    render: function () {
      return <button onClick={this.logOut}>Exit</button>;
    },

    logOut: function () {
      $.ajax({
        type: "delete",
        url: "access",
        success: function () {
          window.location = "/";
        }
      });
    }
  });
})();