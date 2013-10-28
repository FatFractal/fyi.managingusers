//
//  AppDelegate.h
//  ManagingUsersIOSApp
//
//  Created by Kevin Nickels on 10/20/13.
//  Copyright (c) 2013 FatFractal. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <FFEF/FatFractal.h>

/*!
 * The AppDelegate interface that will hold a sender and selector for callback functionality
 * for the common authentication service.
 @attribute id _sender is the instance of the calling class
 @attribute SEL _action is the callback selector from the action.
 */
@interface AppDelegate : UIResponder <UIApplicationDelegate>

/**
 The static method for the FatFractal class used for this tutorial.
 */
+ (FatFractal *) ff;

@end
