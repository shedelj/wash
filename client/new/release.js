Template.newrelease.helpers({
	release: function () {
		var _id = Router.current().params._id;
	    if(!_id) {
	      return undefined;
	  	}
	    return Releases.findOne({_id:_id});
	  },
});

Template.newrelease.events({

    'click #new-release-delete': function() {
    var _id = Router.current().params._id;
    var existingRelease = Releases.findOne({_id:_id});
    if (existingRelease) {
      console.log(existingRelease);
      Meteor.call("deleteRelease", existingRelease);
      Router.go('/releases');
    }
  },

  'click #new-release-submit': function() {

    var release = {
      name: document.getElementById("new-release-name").value,
      description: document.getElementById("new-release-description").value,
      date_modified: Date.now(),
    }

    var files = document.getElementById("new-release-picture").files;

    var _id = Router.current().params._id;
    var existingRelease = Releases.findOne({_id:_id});
    //if we're editing an already existing item
    if(existingRelease){

      release._id = existingRelease._id;

      //if there's a new picture
      if(files[0]){

        S3.delete(existingRelease.imageUrl);
        S3.upload({files:files} ,function(err, data){
          if(err){
            console.log("an error has occurred with the picture upload.");
            console.log(err);
          }
          else{
            release.imageUrl = data.url;
            Meteor.call("newRelease", release);
            Router.go("/releases");
          }
        });
      }
      // else, there is no new picture
      else{
        release.imageUrl = existingRelease.imageUrl;
        Meteor.call("newRelease", release);
        Router.go("/releases");
      }
    }
    //else, it's a completely new thing
    else{

      //a picture is required
      if(!files[0])
        return;

      S3.upload({files:files} ,function(err, data){
        if(err){
          console.log("an error has occurred with the picture upload.");
          console.log(err);
        }
        else{
          release.imageUrl = data.url;
          Meteor.call("newRelease", release);
          Router.go("/releases");
        }
      });
    }
  }
})