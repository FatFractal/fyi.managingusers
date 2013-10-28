//
//  MyFFUser.h
//  ManagingUsersIOSApp
//
//  Created by Kevin Nickels on 10/20/13.
//  Copyright (c) 2013 FatFractal. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <FFEF/FatFractal.h>

@interface MyFFUser : FFUser

@property (strong, nonatomic) NSData *profilePic;
@property (strong, nonatomic) FFGeoLocation *home;
@property (strong, nonatomic) NSString *nickname;

@end
