package com.fatfractal.fyi.managingusers.androidapp;

import android.content.Context;
import android.graphics.BitmapFactory;
import android.test.AndroidTestCase;
import com.fatfractal.ffef.FFGeoLocation;
import com.fatfractal.ffef.FatFractal;
import com.fatfractal.ffef.FFException;
import com.fatfractal.ffef.impl.FFPrefsAndroid;
import com.fatfractal.ffef.impl.FatFractalDispatcher;
import com.fatfractal.ffef.impl.FatFractalHttpImpl;
import com.fatfractal.ffef.json.FFObjectMapper;
import com.fatfractal.fyi.managingusers.androidapp.model.MyFFUser;
import com.fatfractal.fyi.managingusers.androidapp.model.PublicProfile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.Random;

import java.io.ByteArrayOutputStream;

import android.content.res.AssetManager;

import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;

/**
 * This is a simple framework for a test of an Application.  See
 * {@link android.test.ApplicationTestCase ApplicationTestCase} for more information on
 * how to write and extend Application tests.
 * <p/>
 * To run this test, you can type:
 * adb shell am instrument -w \
 * -e class com.fatfractal.fyi.managingusers.androidapp.ManagingUsersAndroidAppTests \
 * com.fatfractal.fyi.managingusers.androidapp.tests/android.test.InstrumentationTestRunner
 */
public class ManagingUsersAndroidAppTests extends AndroidTestCase {

    //private static String HOSTNAME = "localhost";
    private static String HOSTNAME = "fyi.fatfractal.com";
    private static String APPNAME = "managingusers";
    private static FatFractal ffInstance = null;

    static {
        FFObjectMapper.registerClassNameForClazz(MyFFUser.class.getName(), "FFUser");
    }

    @Override
    public void setUp() throws Exception {
        super.setUp();
//        FatFractal ff = getFF(getContext());
//        if (ff != null) {
//            ff.setDebug(true);
//        }
    }

    @Override
    public void tearDown() throws Exception {
        super.tearDown();
        //FatFractal ff = getFF(getContext());
        //if (ff == null) return;
    }

    public static FatFractal getFF(Context context) throws URISyntaxException, FFException {
        boolean local = HOSTNAME.equals("localhost");
        String baseUrl = "http://" + HOSTNAME + (local ? ":8080/" : "/") + APPNAME;
        String sslUrl = "https://" + HOSTNAME + (local ? ":8443/" : "/") + APPNAME;
        if (ffInstance == null) {
            FFPrefsAndroid.setContext(context);
            ffInstance = new FatFractalDispatcher(new FatFractalHttpImpl(new URI(baseUrl), new URI(sslUrl)));
        }

        // Restore all parameters to defaults
        ffInstance.setSimulatingOffline(false);
        ffInstance.setSimulateHttpFailureForNextCalls(0);

        ffInstance.setAutoLoadRefs(true);
        ffInstance.setAutoLoadBlobs(true);

        ffInstance.setDebug(false);

        return ffInstance;
    }

    public void testRegisterMyFFUser() throws FFException, URISyntaxException {
        ffInstance = getFF(getContext());

        if (ffInstance == null) return;

        // first - let's generate some data we will need...
        String firstName = getRandomString(7);
        String lastName = getRandomString(7);
        String email = firstName + "@" + lastName + ".com";
        String username = firstName + lastName;
        String password = "Aa1" + getRandomString(20);
        String nickname = lastName + firstName;
        FFGeoLocation home = new FFGeoLocation(33.5, -112);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        AssetManager manager = getContext().getAssets();
        InputStream open = null;
        try {
            open = manager.open("addphoto.png");
            Bitmap bitmap = BitmapFactory.decodeStream(open);
            bitmap.compress(CompressFormat.PNG, 0 /*ignored for PNG*/, bos);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (open != null) {
                try {
                    open.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        // next - let's create and register the user with some minimum info
        MyFFUser newUser = new MyFFUser();
        newUser.setUserName(username);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmail(email);
        FFObjectMapper.registerClassNameForClazz(MyFFUser.class.getName(), "FFUser");

        ffInstance.registerUser(newUser, password);
            assertNotNull("User registered and has guid", ffInstance.getMetaDataForObj(newUser).getGuid());

        //now add in the "profile" data for the user...
        try {
            newUser.setNickname(nickname);
            newUser.setHome(home);
            ffInstance.updateObj(newUser);
        } catch (FFException e) {
            assertNull(e.getLocalizedMessage(), e);
        }

        //and then add in the profilePic...
        byte[] pic = bos.toByteArray();
        newUser.setProfilePic(pic);

        try {
            ffInstance.updateBlob(pic, "application/octet-stream", newUser, "profilePic");

        } catch (FFException e) {
            assertNull(e.getLocalizedMessage(), e);
        }
    }

    public void testRegisterMyFFUserWithProfile() throws FFException, URISyntaxException {
        ffInstance = getFF(getContext());
        if (ffInstance == null) return;

        // first - let's generate some data we will need...
        String firstName = getRandomString(7);
        String lastName = getRandomString(7);
        String email = firstName + "@" + lastName + ".com";
        String username = firstName + lastName;
        String password = "Aa1" + getRandomString(20);
        String nickname = lastName + firstName;
        FFGeoLocation home = new FFGeoLocation(33.5, -112);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        AssetManager manager = getContext().getAssets();
        InputStream open = null;
        try {
            open = manager.open("addphoto.png");
            Bitmap bitmap = BitmapFactory.decodeStream(open);
            bitmap.compress(CompressFormat.PNG, 0 /*ignored for PNG*/, bos);
            // Assign the bitmap to an ImageView in this layout
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (open != null) {
                try {
                    open.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        // next - let's create and register the user with some minimum info
        MyFFUser newUser = new MyFFUser();
        newUser.setUserName(username);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmail(email);

        try {
            ffInstance.registerUser(newUser, password);
            assertNotNull("User registered and has guid", ffInstance.getMetaDataForObj(newUser).getGuid());
        }  catch (FFException e) {
            assertNull(e.getLocalizedMessage(), e);
        }

        // now let's create the Profile object data for the user...
        PublicProfile profile = new PublicProfile();
        profile.setUser(newUser);
        profile.setNickname(nickname);
        profile.setHome(home);
        byte[] pic = bos.toByteArray();
        profile.setProfilePic(pic);

        try {
            ffInstance.createObjAtUri(profile, "/PublicProfiles");
        } catch (FFException e) {
            assertNull(e.getLocalizedMessage(), e);
        }
    }

    public static String getRandomString(int length){
        String alphabet = new String("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
        int n = alphabet.length();

        String result = "";
        Random r = new Random();

        for (int i=0; i<length; i++)
            result = result + alphabet.charAt(r.nextInt(n));

        return result;
    }

}
