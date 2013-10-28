package com.fatfractal.fyi.managingusers.androidapp.model;

import com.fatfractal.ffef.FFGeoLocation;

/**
 * Created with IntelliJ IDEA.
 * User: kevin
 * Date: 10/20/13
 * Time: 10:32 AM
 * To change this template use File | Settings | File Templates.
 */

public class PublicProfile {
    private MyFFUser m_user;
    private byte[] m_profilePic;
    private String m_nickname;
    private FFGeoLocation m_home;

    public MyFFUser getUser() { return  m_user; }
    public String getNickname() { return m_nickname; }
    public FFGeoLocation getHome() { return m_home; }
    public byte[] getProfilePic() { return m_profilePic; }

    public void setUser(MyFFUser user) { m_user = user; }
    public void setNickname(String nickname) { m_nickname = nickname; }
    public void setHome(FFGeoLocation home) { m_home = home; }
    public void setProfilePic(byte[] profilePic) { m_profilePic = profilePic; }
}
