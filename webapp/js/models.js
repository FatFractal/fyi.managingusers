//
//  ManagingUsersTests
//

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

function PublicProfile(obj) {
   if(obj) {
      this.user = new MyFFUser(obj.user);
      this.profilePic = obj.profilePic;
      this.nickname = obj.nickname;
      this.home = new FFGeoLocation(obj.home);
   } else {
      this.user = new MyFFUser();
      this.profilePic = null;
      this.nickname = null;
      this.home = new FFGeoLocation();
   }
}

