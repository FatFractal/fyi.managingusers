package com.fatfractal.fyi.managingusers.androidapp.model;

/**
 * Created with IntelliJ IDEA.
 * User: kevin
 * Date: 10/20/13
 * Time: 10:27 AM
 * To change this template use File | Settings | File Templates.
 */

import com.fatfractal.ffef.FFGeoLocation;
import com.fatfractal.ffef.FFUser;

public class MyFFUser  extends FFUser {
    private String m_nickname;
    private FFGeoLocation m_home;
    private byte[] m_profilePic;

    public String getNickname() { return m_nickname; }
    public FFGeoLocation getHome() { return m_home; }
    public byte[] getProfilePic() { return m_profilePic; }

    public void setNickname(String nickname) { m_nickname = nickname; }
    public void setHome(FFGeoLocation home) { m_home = home; }
    public void setProfilePic(byte[] profilePic) { m_profilePic = profilePic; }
}
