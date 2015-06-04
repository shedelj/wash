Template.releases.helpers({
	releases: function () {
		return Releases.find({}, {sort: {date_modified: -1}}).fetch();
	}
});
