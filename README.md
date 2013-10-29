fyi.managingusers
=================

Examples of user management on the FatFractal platform

This sample application demonstrates some of the options for doing user management on the FatFractal platform. 

The current version includes examples of two methods to add some custom information about the user to the system. Either is fine, and there are some important distinctions regarding access control that you may want to consider.

<strong>Subclassing FFUser</strong>

The first method is to subclass the FFUser class that is included in all the SDKs. The example here adds three parameters to the definition - including a nickname (String), location (FFGeoLocation) and profilePic (byte[]). You can see the examples as follows:

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/ManagingUsersAndroidApp/src/com/fatfractal/fyi/managingusers/androidapp/model/MyFFUser.java>Subclassing FFUser for Android</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/ManagingUsersAndroidApp/test/src/com/fatfractal/fyi/managingusers/androidapp/ManagingUsersAndroidAppTests.java#lines->Android test case for registering a MyFFUser user</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/ManagingUsersIOSApp/ManagingUsersIOSApp/MyFFUser.h>Subclassing FFUser for iOS</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/ManagingUsersIOSApp/ManagingUsersIOSAppTests/ManagingUsersIOSAppTests.m#lines-42-92>iOS test case for registering a MyFFUser user</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/webapp/js/models.js#lines-1-14>Subclassing FFUser for HTML5/JS</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/webapp/js/ManagingUsersTests.js>HTML5/JS test case for registering a MyFFUser user</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/ff-config/application.ffdl#line-21>FFDL definition for FFUser</a>

<strong>Using a REFERENCE</strong>

The other method is to add the additional information to a new Objecttype (my example is called PublicProfile) that contains the same additional information, but also includes a REFERENCE to FFUser. This allows for managing access control for some user information independent of the FFUser which may be useful in some cases. Note - for this exercise, the FFUser still has the expanded parameters, but the sample code only populates the standard info for a user. They point is that you can easily separate what is private and what is more "public".

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/ManagingUsersAndroidApp/src/com/fatfractal/fyi/managingusers/androidapp/model/PublicProfile.java>PublicProfile class with REFERENCE for Android</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/ManagingUsersAndroidApp/test/src/com/fatfractal/fyi/managingusers/androidapp/ManagingUsersAndroidAppTests.java#lines-152-226>Android test case for registering a FFUser(MyFFUser) user and creating a PublicProfile as well</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/ManagingUsersIOSApp/ManagingUsersIOSApp/PublicProfile.h>PublicProfile class with REFERENCE for iOS</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/ManagingUsersAndroidApp/test/src/com/fatfractal/fyi/managingusers/androidapp/ManagingUsersAndroidAppTests.java>iOS test case for registering a MyFFUser user</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/ManagingUsersIOSApp/ManagingUsersIOSAppTests/ManagingUsersIOSAppTests.m#lines-94-129>iOS test case for registering a FFUser(MyFFUser) user and creating a PublicProfile as well</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/webapp/js/models.js#lines-16-28>PublicProfile class with REFERENCE for HTML5/JS</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/webapp/js/ManagingUsersTests.js>HTML5/JS test case for registering a FFUser(MyFFUser) user and creating a PublicProfile as well</a>

<a href = https://github.com/FatFractal/fyi.managingusers/blob/master/ff-config/application.ffdl#line-25>FFDL definition for PublicProfile</a>


