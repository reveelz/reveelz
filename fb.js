(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));

// Init the SDK upon load
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1021938314510712', // App ID
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });


// Specify the extended permissions needed to view user data
// The user will be asked to grant these permissions to the app (so only pick those that are needed)
        var permissions = [
           'public_profile',
		   'email',
		   'user_birthday',
		   'user_location',
		   'user_hometown',
		   'user_about_me',
		   'user_relationship_details',
          ].join(',');

// Specify the user fields to query the OpenGraph for.
// Some values are dependent on the user granting certain permissions
        var fields = [
          'name',
		  'first_name',
          'middle_name',
          'last_name',
		  'gender',
		  'age_range',
		  'birthday',
		  'hometown',
		  'email',
		  'location',
		  'city',
		  'state',
		  'country',
		  'relationship_status',
          ].join(',');

  function showDetails() {
    FB.api('/me', {fields: fields}, function(details) {
      // output the response
      $('#userdata').html(JSON.stringify(details, null, '\t'));
      $('#fb-login').attr('style', 'display:none;');
    });
  }


  $('#fb-login').click(function(){
    //initiate OAuth Login
    FB.login(function(response) { 
      // if login was successful, execute the following code
      if(response.authResponse) {
          showDetails();
      }
    }, {scope: permissions});
  });

};