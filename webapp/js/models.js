function MyFFUser(obj) {
   this.clazz = "FFUser";
   if(u) {
      this.profilePic = obj.profilePic;
      this.nickname = obj.nickname;
      this.home = new FFGeoLocation(obj.home);
    } else {
      this.profilePic = null;
      this.nickname = null;
      this.home = new FFGeoLocation();
    }
    return this;
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

