package com.fatfractal.fyi.managingusers.androidapp;

import android.app.Application;
import java.net.URI;
import java.net.URISyntaxException;

import com.fatfractal.ffef.FatFractal;
import com.fatfractal.ffef.impl.FatFractalHttpImpl;
import com.fatfractal.ffef.json.FFObjectMapper;
import com.fatfractal.fyi.managingusers.androidapp.model.MyFFUser;
import com.fatfractal.fyi.managingusers.androidapp.model.PublicProfile;



/**
 * Created with IntelliJ IDEA.
 * User: kevin
 * Date: 10/20/13
 * Time: 10:58 AM
 * To change this template use File | Settings | File Templates.
 */
public class ManagingUsersApp extends Application {
    private final static String CLASS_NAME = ManagingUsersApp.class.getName();
    //private final static String HOSTNAME = "localhost";
    private final static String HOSTNAME = "fyi.fatfractal.com";
    private final static String APPNAME = "managingusers";

    public static FatFractal ff = null;

    @Override
    public void onCreate() {
        super.onCreate();

        if (ff == null) {
            ff = getFF();
        }
    }
    public static FatFractal getFF() {
        if (ff == null) {
            boolean local = HOSTNAME.equals("localhost");
            String baseUrl = "http://" + HOSTNAME + (local ? ":8080/" : "/") + APPNAME;
            String sslUrl = "https://" + HOSTNAME + (local ? ":8443/" : "/") + APPNAME;
            try {
                ff = FatFractal.getInstance(new URI(baseUrl), new URI(sslUrl));
                FatFractalHttpImpl.addTrustedHost("fyi.fatfractal.com");
                FFObjectMapper.registerClassNameForClazz(MyFFUser.class.getName(), "MyFFUser");
                FFObjectMapper.registerClassNameForClazz(PublicProfile.class.getName(), "PublicProfile");
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
        }
        return ff;
    }
}
