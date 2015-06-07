Template.newartist.helpers({
	artist: function () {
		var _id = Router.current().params._id;
	    if(!_id) {
	      return undefined;
	  	}
	    return Artists.findOne({_id:_id});
	  },
});

Template.newartist.events({
  'click #new-artist-delete': function() {
    var _id = Router.current().params._id;
    var existingArtist = Artists.findOne({_id:_id});
    if (existingArtist) {
      console.log(existingArtist);
      Meteor.call("deleteArtist", existingArtist);
      Router.go('/artists');
    }
  },

  'click #new-artist-submit': function() {

    var artist = {
      name: document.getElementById("new-artist-name").value,
      description: document.getElementById("new-artist-description").value,
      soundcloud: document.getElementById("new-artist-sc").value,
      date_modified: Date.now(),
      type: "artist",
      }

    var files = document.getElementById("new-artist-picture").files;

    var _id = Router.current().params._id;
    var existingArtist = Artists.findOne({_id:_id});
    //if we're editing an already existing item
    if(existingArtist){

      artist._id = existingArtist._id;

      //if there's a new picture
      if(files[0]){

        S3.delete(existingArtist.imageUrl);
        S3.upload({files:files} ,function(err, data){
          if(err){
            console.log("an error has occurred with the picture upload.");
            console.log(err);
          }
          else{
            artist.imageUrl = data.url;
            Meteor.call("newArtist", artist);
            Router.go("/artists");
          }
        });
      }
      // else, there is no new picture
      else{
        artist.imageUrl = existingArtist.imageUrl;
        Meteor.call("newArtist", artist);
        Router.go("/artists");
      }
    }
    //else, it's a completely new item
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
          artist.imageUrl = data.url;
          Meteor.call("newArtist", artist);
          Router.go("/artists");
        }
      });
    }
  }
})