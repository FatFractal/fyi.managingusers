//
//  ManagingUsersTests
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

/*!
* Tests the ability to access data without authentication if allowed.
*/
asyncTest("testRegisterMyFFUser", function() {
   // first - let's generate some data we will need...
   var firstName = randomString(7);
   var lastName = randomString(7);
   var email = firstName + "@" + lastName + ".com";
   var password = "Aa1" + randomString(20);
   var nickname = lastName + firstName;
   // start with standard user info
   var newUser = new MyFFUser();
   newUser.firstName = firstName;
   newUser.lastName = lastName;
   newUser.email = email;
   newUser.userName = email;
   newUser.password = password;
   var home = new FFGeoLocation();
   home.latitude = 33.5;
   home.longitude = -112;
   newUser.home = home;
   newUser.nickname = nickname;
   console.log(JSON.stringify(newUser));
   ff.register(newUser,  function(loggedInUser) {
      ok(ff.loggedIn(), "ff.loggedIn() is " + ff.loggedIn());
      ok(loggedInUser.home.latitude == 33.5, "latitude is correct.");
      ok(loggedInUser.home.longitude == -112, "longitude is correct.");
      // add the profile pic data
      getByteArrayFromImageUrl("assets/addphoto.png", function(pic) {
          ok(pic !== null, "not able to read image.");
          loggedInUser.profilePic = pic;
          console.log("Image byteLength is: " + pic.byteLength);  
          ff.updateBlobForObj(loggedInUser, loggedInUser.profilePic, "profilePic", "image/png", function(userWithBlob) {
              ok(userWithBlob.profilePic.byteLength == pic.byteLength, "confirmed blob matches");
              start(); 
          }, function(code, msg) {
              ok(false, "Failed to update the profilePic for " + loggedInUser.userName + " error was " + msg);
              start(); 
          });
      });  
   }, function(code, msg) {
      ok(false, "Error registering the user " + newUser.userName + " error was " + msg);
      start(); 
   }); 
});

/*!
* Tests the ability to access data without authentication if allowed.
*/
asyncTest("testRegisterMyFFUserWithProfile", function() {
      // first - let's generate some data we will need...
      var firstName = randomString(7);
      var lastName = randomString(7);
      var email = firstName + "@" + lastName + ".com";
      var password = "Aa1" + randomString(20);
      var nickname = lastName + firstName;
      // start with standard user info
      var newUser = new MyFFUser();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.userName = email;
      newUser.password = password;
      var home = new FFGeoLocation();
      home.latitude = 33.5;
      home.longitude = -112;
      newUser.home = home;
      console.log(JSON.stringify(newUser));
      ff.register(newUser,  function(loggedInUser) {
              ok(ff.loggedIn(), "ff.loggedIn() is " + ff.loggedIn());
              // now let's create the PublicProfile
              var profile = new PublicProfile();
              profile.user = loggedInUser;
              profile.nickname = nickname; 
              profile.home = home;
              // add the profile pic data
              getByteArrayFromImageUrl("assets/addphoto.png", function(pic) {
                    ok(pic !== null, "not able to read image.");
                    profile.profilePic = pic;
                    console.log("Image byteLength is: " + pic.byteLength);  
                    ff.createObjAtUri(profile, "/PublicProfile",  function(newProfile) {
                        ok(newProfile.home.latitude == 33.5, "latitude is correct.");
                        ok(newProfile.home.longitude == -112, "longitude is correct.");
                        ok(newProfile.profilePic.byteLength !== null, "profilePic is correct.");
                          start(); 
                    }, function(code, msg) {
                       ok(false, "Failed to update the user profile data for " + loggedInUser.userName + " error was " + msg);
                       start(); 
                    });
              });  
      }, function(code, msg) {
           ok(false, "Error registering the user " + newUser.userName + " error was " + msg);
           start(); 
      }); 
});

/*!
* Tests the ability to access data without authentication if allowed.
*/
asyncTest("testChangePassword", function() {
    // first - let's generate some data we will need...
    var firstName = randomString(7);
    var lastName = randomString(7);
    var email = firstName + "@" + lastName + ".com";
    var password = "Aa1" + randomString(20);
    var nickname = lastName + firstName;
    // start with standard user info
    var home = new FFGeoLocation();
    var newUser = new MyFFUser();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.userName = email;
    newUser.password = password;
    var home = new FFGeoLocation();
    home.latitude = 33.5;
    home.longitude = -112;
    newUser.home = home;
    console.log(JSON.stringify(newUser));
    ff.register(newUser,  function(loggedInUser) {
        ok(ff.loggedIn(), "ff.loggedIn() is " + ff.loggedIn());
        // we will call an extension to change the password
        var newPassword = "Aa1" + randomString(20);
        ff.postObjToExtension({password:newPassword}, "/ff/ext/changePassword", function(response) {
            ff.login(newUser.userName, newPassword, function(newLogin) {
                console.log("User : " + newUser.userName + " logged in with new password");  
                ok(ff.loggedIn(), "ff.loggedIn() is " + ff.loggedIn());
                start(); 
            }, function(code, msg) {
                ok(false, "Error logging in with new password " + newUser.userName + " error was " + msg);
                start(); 
            });
        }, function(code, msg) {
            ok(false, "Failed to update the user password for " + loggedInUser.userName + " error was " + msg);
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

