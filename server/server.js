Meteor.startup(function () {
	//
});



Accounts.onCreateUser(function(options, user) {
  if(Meteor.users.find().fetch().length == 0){
    user.roles = ['admin'];
  }
  return user;
});

Meteor.publish("artists", function () {
	return Artists.find();
});

Meteor.publish("releases", function () {
	return Releases.find();
});

Meteor.methods({
	newArtist: function (artist) {
		var user = Meteor.user();
		if (!user || !user.roles) {
			throw new Meteor.Error(403, "Access denied");
		}

		//we're editing an existing artist
		if (artist._id) {
			Artists.remove({_id:artist._id});
			delete artist._id;
		}
		Artists.insert(artist);
	},
	newRelease: function (release) {
		var user = Meteor.user();
		if (!user || !user.roles) {
			throw new Meteor.Error(403, "Access Denied");
		}

		if (release._id) {
			Releases.remove({_id:release._id});
			delete release._id;
		}
		Releases.insert(release);
	},

	deleteArtist: function (artist) {
		var user = Meteor.user();
		if (!user || !user.roles) {
			throw new Meteor.Error(403, "Access Denied");
		}
		if (artist._id) {
			Artists.remove({_id:artist._id});
			delete artist._id;
		}
	},
	deleteRelease: function (release) {
		var user = Meteor.user();
		if (!user || !user.roles) {
			throw new Meteor.Error(403, "Access Denied");
		}
		if (release._id) {
			Releases.remove({_id:release._id});
			delete release._id;
		}
	},

	newEvent: function (eventT) {
		var user = Meteor.user();
		if (!user || !user.roles) {
			throw new Meteor.Error(403, "Access Denied");
		}

		if (eventT._id) {
			Events.remove({_id:eventT._id});
			delete eventT._id;
		}
		Events.insert(eventT);
	},

	deleteEvent: function (eventT) {
		var user = Meteor.user();
		if (!user || !user.roles) {
			throw new Meteor.Error(403, "Access Denied");
		}
		if (eventT._id) {
			eventT.remove({_id:eventT._id});
			delete eventT._id;
		}
	},

});