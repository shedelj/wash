Template.artists.helpers({
	artists: function () {
		return Artists.find({}, {sort: {name: 1}}).fetch();
	}
});
