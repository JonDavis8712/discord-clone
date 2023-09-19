import React, { useState, useEffect } from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import GifIcon from '@mui/icons-material/Gif';
import Message from './Message';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { useSelector } from'react-redux';
import { selectUser } from './features/userSlice';
import { setChannelInfo } from './features/appSlice';
import db from './firebase';
import firebase from 'firebase/compat/app';

function Chat() {
    const channelId = useSelector(selectChannelId);
    const user =  useSelector(selectUser);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (channelId) {
            db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => 
        setMessages(snapshot.docs.map((doc) => doc.data()))
        )
        }
        
    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('channels').doc(channelId).collection('messages').
        add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user,
        });
        setInput("");
    }

  return (
    <div className="chat">
        <ChatHeader channelName={channelName} />

        <div className="chat__messages">
            {messages.map((message) => (
                <Message 
                timestamp={message.timestamp} 
                user={message.user} 
                message={message.message} />
            ))}
        </div>

        <div className="chat__input">
            <AddCircleIcon fontSize="large"/>
            <form>
                <input value={input} 
                disabled={!channelId} 
                onChange= {e => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
                <button
                onClick={sendMessage}
                disabled={!channelId}
                className="chat__inputButton" type='submit'>Send Message
                </button>
            </form>
        <div className="chat__inputIcons">
            <CardGiftcardIcon fontSize="large" />
            <GifIcon fontSize="large" />
            <EmojiEmotionsIcon fontSize="large" />
        </div>

        </div>
    </div>
  )
}

export default Chat