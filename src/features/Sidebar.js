import React from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CallIcon from '@mui/icons-material/Call';
import { Avatar } from '@material-ui/core';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { setChannelInfo } from '../features/appSlice';
import db, { auth } from '../firebase';
import { useState, useEffect } from 'react';
import { useDispatch } from'react-redux';

const Sidebar = () => {
    const [isLogoutMessageVisible, setIsLogoutMessageVisible] = useState(false);
    const [channels, setChannels] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
     db.collection("channels").onSnapshot((snapshot) =>
     setChannels(
        snapshot.docs.map((doc) => ({
            id: doc.id,
            channel: doc.data(),
        }))
     )
     );
    }, []);
    useEffect(() => {
        if (channels.length !== 0) {
          dispatch(
            setChannelInfo({
              channelId: channels[0]?.id,
              channelName: channels[0]?.channel?.channelName,
            })
          );
        }
      }, [dispatch, channels]);
    
    const handleAddChannel = () => {
        const channelName = prompt('Please enter a channel name');
        if (channelName) {
        db.collection("channels").add({
            channelName: channelName,
          });
        }
      };


    const handleAvatarClick = () => {
        setIsLogoutMessageVisible(true);
    }

    const handleLogout = () => {
        setIsLogoutMessageVisible(false);
    }

    const avatarStyle = {
        cursor: 'pointer', // Apply cursor style to Avatar
      };

      const logoutMessageStyle = {
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        display: isLogoutMessageVisible ? 'block' : 'none', // Toggle display
        padding: '2px',
        position: 'fixed',
        zIndex: '1000',
        top: '85%',
        left: '5%',
        transform: 'translate(-50%, -50%)',
        opacity: isLogoutMessageVisible ? '.85' : '0', // Toggle opacity
        transition: 'opacity 0.5s ease',
        cursor: 'pointer', // Apply cursor style to logout message
      };

  return (
    <div className='sidebar'>

      <div className="sidebar__top">
        <h3>Jon's room</h3>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
          
        </div>
        <div className="sidebar__channelsList">
        {channels.map(({ id, channel }) => (
            <SidebarChannel key={id} id={id} channelName={channel.channelName} />
        ))}
      </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon className="sidebar__voiceIcon"
            fontSize="large"
        />
        <div className="sidebar__voiceInfo">
            <h3>Voice Connected</h3>
            <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
            <InfoOutlinedIcon />
            <CallIcon />
        </div>
      </div>
      <div className="sidebar__profile">
      <div className="avatar-container" onMouseEnter={handleAvatarClick}
      onMouseLeave={handleLogout}>
        <Avatar onClick={() => auth.signOut() && handleLogout()} src={user.photo} style={avatarStyle} />
        <p style={logoutMessageStyle} className="logoutMessage">Logout <br />Current <br /> user</p>
        </div>
        <div className="sidebar__profileInfo">
            <h3>{user.displayName}</h3>
            <p>#{user.uid.substring(0,5)}</p>
        </div>
        <div className="sidebar__profileIcons">
            <MicIcon />
            <HeadsetIcon />
            <SettingsIcon />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
