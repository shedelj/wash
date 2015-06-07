Template.home.helpers({
	items: function() {
		artists = Artists.find({}).fetch();
		releases = Releases.find({}).fetch();
		items = artists.concat(releases);
		return _.sortBy(items, function(item) {return item.date_modified;}).reverse();
	},

	isRelease: function(item) {
		if (item.type == "release")
			return true;
		else return false;
	},

	isArtist: function(item) {
		if (item.type == "artist")
			return true;
		else return false;
	},

});