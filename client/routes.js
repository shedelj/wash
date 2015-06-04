Router.route("/", function() {
	this.render('home');
});

Router.route("/about", function() {
	this.render('about');
});

Router.route("/artists", function() {
	this.render('artists');
});

Router.route("/releases", function() {
	this.render('releases');
});

Router.route("/admin", function () {
	this.render('admin');
});

Router.route("/new/artist", function () {
	this.render('newartist');
});

Router.route("/new/release", function () {
	this.render('newrelease');
});

Router.route("/edit/artist/:_id", function () {
  this.render("newartist");
});

Router.route("/edit/release/:_id", function () {
  this.render("newrelease");
});

Router.configure({
	layoutTemplate: 'layout'
});