//= require bunnyEars
//= require utils
//= require components/admin/addButton
//= require components/admin/logOut
//= require components/admin/header
//= require components/admin/uploadButton
//= require components/admin/editable
//= require components/admin/imageForm
//= require components/admin/tvShow
//= require components/admin/tvList
//= require components/admin/dashboard

$(function () {
  var Dashboard = BunnyEars.Admin.Dashboard;
  React.render(<Dashboard />, document.getElementById("content"));
});


