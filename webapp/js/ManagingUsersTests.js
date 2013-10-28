//
//  KitchenSyncTests
//

QUnit.config.autostart = false;

var ff = null;

function setUpManagingUsersTests() {
   if (! ff) {
      ff = new FatFractal();
      ff.setDebug(false);
      ff.setSimulateCookies(true);
   }
   QUnit.start();
}

/*!
* A bool value that controls whether certain log messages are printed out or not during these tests.
*/
var showLogs = true;

function MyFFUser(obj) {
   this.clazz = "MyFFUser";
   this.FFUser = FFUser;
   this.FFUser();
   if(obj) {
      this.userName   = obj.userName;
      this.firstName  = obj.firstName;
      this.lastName   = obj.lastName;
      this.email      = obj.email;
      this.active     = obj.active;
      this.profilePic = obj.profilePic;
      this.home = new FFGeoLocation(obj.home);
   } else {
      this.userName   = null;
      this.firstName  = null;
      this.lastName   = null;
      this.email      = null;
      this.active     = null;
      this.profilePic = null;
      this.home = new FFGeoLocation();
   }
}
MyFFUser.prototype = new FFUser;

/*!
* Tests the ability to access data without authentication if allowed.
*/
asyncTest("testRegisterMyFFUser", function() {
   // first - let's generate some data we will need...
   var firstName = randomString(7);
   var lastName = randomString(7);
   var email = firstName + "@" + lastName + ".com";
   var password = "Aa1" + randomString(20);
   // start with standard user info
   var newUser = new MyFFUser();
   newUser.firstName = firstName;
   newUser.lastName = lastName;
   newUser.email = email;
   newUser.userName = email;
   newUser.password = password;
   console.log(JSON.stringify(newUser));
   ff.register(newUser,  function(loggedInUser) {
      ok(ff.loggedIn(), "ff.loggedIn() is " + ff.loggedIn());
      var home = new FFGeoLocation();
      home.latitude = 33.5;
      home.longitude = -112;
      loggedInUser.home = home;
      // add the profile data
      ff.updateObj(loggedInUser, function(updatedUser) {
      	    ok(updatedUser.home.latitude == 33.5, "latitude is correct.");
      	    ok(updatedUser.home.longitude == -112, "longitude is correct.");
      	    // add the profile pic data
      	    getByteArrayFromImageUrl("assets/addphoto.png", function(pic) {
      	    	  ok(pic !== null, "not able to read image.");
      	    	  updatedUser.profilePic = pic;
      	    	  console.log("Image byteLength is: " + pic.byteLength);  
      	    	  ff.updateBlobForObj(updatedUser, updatedUser.profilePic, "profilePic", "image/png", function(userWithBlob) {
      	    	        ok(userWithBlob.profilePic.byteLength == pic.byteLength, "confirmed blob matches");
      	    	  	start(); 
      	    	  }, function(code, msg) {
      	    	     ok(false, "Failed to update the profilePic for " + updatedUser.userName + " error was " + msg);
      	    	     start(); 
      	    	  });
      	    });  
      }, function(code, msg) {
         ok(false, "Failed to update the user profile data for " + loggedInUser.userName + " error was " + msg);
         start(); 
      });
   }, function(code, msg) {
      ok(false, "Error registering the user " + newUser.userName + " error was " + msg);
      start(); 
   }); 
});


/*!
Generates a random string of up to 1000 characters in length. Generates a random length up to 1000 if numCharacters is set to 0.
*/
function randomString(numCharacters) {
    //static char const possibleChars[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var len;
    if(numCharacters > 1000 || numCharacters == 0) len = Math.random() * (numCharacters);
    else len = numCharacters;
    var randomString = "";
    for(var i=0; i < len; ++i ) {
    	var randomPoz = Math.floor(Math.random() * possibleChars.length);
    	randomString += possibleChars.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

function getByteArrayFromImageUrl(URL, callback) {
   var img = new Image();
   img.src = URL;
   console.log("getByteArrayFromImageUrl URL is: " + URL);
   console.log("getByteArrayFromImageUrl img is: " + img);   
   var data;
   img.onload = function () { 
      var canvas = document.createElement("canvas");
      canvas.width =this.width;
      canvas.height =this.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0);
      var imageData = ctx.getImageData(0, 0, this.width, this.height);
      var data = imageData.data;
      console.log("getByteArrayFromImageUrl imageData is: " + imageData);      
      console.log("getByteArrayFromImageUrl data is: " + data);      
      callback(data);
   }
}

