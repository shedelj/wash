Template.newevent.helpers({
	eventT: function () {
		var _id = Router.current().params._id;
	    if(!_id) {
	      return undefined;
	  	}
	    return Events.findOne({_id:_id});
	  },
});

Template.newevent.events({
  'click #new-event-delete': function() {
    var _id = Router.current().params._id;
    var existingEvent = Events.findOne({_id:_id});
    if (existingEvent) {
      console.log(existingEvent);
      Meteor.call("deleteEvent", existingEvent);
      Router.go('/events');
    }
  },

  'click #new-event-submit': function() {

    var eventT = {
      name: document.getElementById("new-event-name").value,
      //description: document.getElementById("new-event-description").value,
      date_modified: Date.now(),
      type: "event",
      }

    var file1 = document.getElementById("new-event-picture").files;

    var _id = Router.current().params._id;
    var existingEvent = Events.findOne({_id:_id});
    //if we're editing an already existing item
    if(existingEvent){

      eventT._id = existingEvent._id;

      //if there's a new picture
      if(files[0]){

        S3.delete(existingEvent.imageUrl);
        S3.upload({files:files} ,function(err, data){
          if(err){
            console.log("an error has occurred with the picture upload.");
            console.log(err);
          }
          else{
            eventT.imageUrl = data.url;
            Meteor.call("newEvent", event);
            Router.go("/Events");
          }
        });
      }
      // else, there is no new picture
      else{
        eventT.imageUrl = existingEvent.imageUrl;
        Meteor.call("newEvent", event);
        Router.go("/Events");
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
          event.imageUrl = data.url;
          Meteor.call("newEvent", event);
          Router.go("/events");
        }
      });
    }
  }
})