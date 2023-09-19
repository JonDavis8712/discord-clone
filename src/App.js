import React, { useEffect } from 'react';
import Sidebar from './features/Sidebar';
import Chat from './Chat';
import './App.css';
import { useSelector, useDispatch } from'react-redux';
import { selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(()=>{
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        console.log(authUser)
        dispatch(login({
          uid: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
          photo: authUser.photoURL
        }))
      } else {
        dispatch(logout())
      }
    })
  },[dispatch])

  return (
    // BEM naming convention
    <div className="app">
    { user ? (
      <>
      <Sidebar />
      <Chat />
      </>
    ) : (
      <Login />
    )}
      

    </div>
  );
}

export default App;
