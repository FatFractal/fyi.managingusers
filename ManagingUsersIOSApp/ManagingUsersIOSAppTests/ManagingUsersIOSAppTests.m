//
//  ManagingUsersIOSAppTests.m
//  ManagingUsersIOSAppTests
//
//  Created by Kevin Nickels on 10/20/13.
//  Copyright (c) 2013 FatFractal. All rights reserved.
//

#import <XCTest/XCTest.h>
#import <FFEF/FatFractal.h>
#import "MyFFUser.h"
#import "PublicProfile.h"


@interface ManagingUsersIOSAppTests : XCTestCase

@end

@implementation ManagingUsersIOSAppTests

static FatFractal * ff;
static NSString * baseUrl = @"https://fyi.fatfractal.com/managingusers";
//static NSString * baseUrl = @"https://localhost:8443/managingusers";

- (void)setUp
{
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
    if (! ff) {
        ff = [[FatFractal alloc] initWithBaseUrl:baseUrl];
        [ff registerClass:[MyFFUser class] forClazz:@"FFUser"];
        [ff setDebug:true];
    }
}

- (void)tearDown
{
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testRegisterMyFFUser
{
    // first - let's generate some data we will need...
    NSString * firstName = [self randomString:7];
    NSString * lastName = [self randomString:7];
    NSString * email = [NSString stringWithFormat:@"%@@%@.com", firstName, lastName];
    NSString * password = [NSString stringWithFormat:@"Aa1%@", [self randomString:20]];
    NSString * username = [NSString stringWithFormat:@"%@%@", firstName, lastName];
    NSString * nickname = [NSString stringWithFormat:@"%@%@", lastName, firstName];
    FFGeoLocation * home = [[FFGeoLocation alloc] initWithLatitude:33.5 longitude:-112];
    NSData * pic = UIImagePNGRepresentation([UIImage imageNamed:@"addphoto.png"]);
    XCTAssertNotNil(pic, @"Could not load image, nil response");

    // next - let's create and register the user with some minimum info
    MyFFUser * newUser = [[MyFFUser alloc] init];
    newUser.userName = username;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    NSError * registerError;
    newUser = (MyFFUser *)[ff registerUser:newUser password:password error:&registerError];
    XCTAssertNil(registerError, @"Register error for %@; error was %@", [newUser userName], [registerError localizedDescription]);
    XCTAssertNotNil(newUser, @"Register failed for %@; uaer was nil", [newUser userName]);
    
    // now add in the "profile" data for the user...
    newUser.nickname = nickname;
    newUser.home = home;
    NSError * updateError;
    [ff updateObj:newUser error:&updateError];
    XCTAssertNil(updateError,
                 @"update user error for %@; error was %@",
                 [newUser userName],
                 [updateError localizedDescription]);
    
    // and then add in the profilePic...
    newUser.profilePic = pic;
    NSLog(@"Image length is: %lu", (unsigned long)[pic length]);
    [ff updateBlob:pic
      withMimeType:@"image/png" //application/octet-stream image/png
            forObj:newUser
        memberName:@"profilePic"
        onComplete:^(NSError *theErr,
                     id theObj,
                     NSHTTPURLResponse *theResponse)
     {
         XCTAssertNil(theErr,
                      @"Failed to update the profilePic data for %@; error was %@",
                      [newUser userName],
                      [theErr localizedDescription]);
     }];
}

- (void)testRegisterMyFFUserWithProfile
{
    // first - let's generate some data we will need...
    NSString * firstName = [self randomString:7];
    NSString * lastName = [self randomString:7];
    NSString * email = [NSString stringWithFormat:@"%@@%@.com", firstName, lastName];
    NSString * password = [NSString stringWithFormat:@"Aa1%@", [self randomString:20]];
    NSString * username = [NSString stringWithFormat:@"%@%@", firstName, lastName];
    NSString * nickname = [NSString stringWithFormat:@"%@%@", lastName, firstName];
    FFGeoLocation * home = [[FFGeoLocation alloc] initWithLatitude:33.5 longitude:-112];
    NSData * pic = UIImagePNGRepresentation([UIImage imageNamed:@"addphoto.png"]);
    XCTAssertNotNil(pic, @"Could not load image, nil response");

    // next - let's create and register the user with the info we want to be more "private"
    MyFFUser * newUser = [[MyFFUser alloc] init];
    newUser.userName = username;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    NSError * registerError;
    newUser = (MyFFUser *)[ff registerUser:newUser password:password error:&registerError];
    XCTAssertNil(registerError, @"Register error for %@; error was %@", [newUser userName], [registerError localizedDescription]);
    XCTAssertNotNil(newUser, @"Register failed for %@; user was nil", [newUser userName]);
    
    // now let's create the Profile object data for the user...
    PublicProfile * profile = [[PublicProfile alloc] init];
    profile.user = newUser;
    profile.nickname = nickname;
    profile.home = home;
    profile.profilePic = pic;
    NSLog(@"profile.profilePic length is: %lu", (unsigned long)[profile.profilePic length]);
    NSError * error;
    profile = [ff createObj:profile atUri:@"/PublicProfiles" error:&error];
    XCTAssertNil(error, @"Create Profile error for %@; error was %@", [profile nickname], [error localizedDescription]);
    XCTAssertNotNil(profile.profilePic, @"Profile thumbnail is nil");
}

/*!
 Generates a random string of up to 1000 characters in length.
 */
-(NSString *)randomString:(int)numCharacters {
    static char const possibleChars[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    int len;
    if(numCharacters > 1000) len = (int)rand() % (1000);
    else len = numCharacters;
    unichar characters[len];
    for( int i=0; i < len; ++i ) {
        characters[i] = possibleChars[arc4random_uniform(sizeof(possibleChars)-1)];
    }
    return [NSString stringWithCharacters:characters length:len] ;
}


@end
