//= require bunnyEars
//= require utils
//= require components/public/tvArticle
//= require components/public/listItem
//= require components/public/listModal
//= require components/public/tvShow
//= require components/public/tvList
//= require components/public/nav
//= require components/public/recommendForm
//= require components/public/searchForm
//= require components/public/header
//= require components/public/app

$(function () {
  var App = BunnyEars.App, ListModal = BunnyEars.ListModal;
  React.render(<App />, document.getElementById("content"));
  React.render(<ListModal />, document.getElementById("list-drop"));
});