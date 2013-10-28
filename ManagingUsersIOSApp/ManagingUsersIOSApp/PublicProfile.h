//
//  PublicProfile.h
//  ManagingUsersIOSApp
//
//  Created by Kevin Nickels on 10/20/13.
//  Copyright (c) 2013 FatFractal. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MyFFUser.h"

@interface PublicProfile : NSObject

@property (strong, nonatomic) MyFFUser *user;
@property (strong, nonatomic) NSData *profilePic;
@property (strong, nonatomic) NSString *nickname;
@property (strong, nonatomic) FFGeoLocation *home;

@end
