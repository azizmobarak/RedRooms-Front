import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import querystring from 'query-string';
let socket;

const Messages=(props)=> {

const [message,setmessage] = useState(props.room[0].msg);
const [messages,setmessages] = useState([]);
const name = localStorage.getItem('user');
const ENDPOINT ="http://localhost:3300/"


useEffect(() => {
 socket = io(ENDPOINT);
 socket.emit("join",{name:name,room:props.room[0].room});
 
},[ENDPOINT,props.room[0].room]);

useEffect(()=>{
socket.on("message",(data)=>{
    setmessages([...messages,data])
});
var element = document.getElementById("scrolldiv");
 element.scrollTop = element.scrollHeight;
},[messages])


  return (
    <div className="w-100">
    <ul className="listmsg">
    {messages.map(msg=>{
        if(msg.user!==name)
        {
        return (
        <li className="otherusermsg">
        <div className="row">
        <div className="col-9">
        <p>{msg.text}</p>
        </div>
        <div className="col-3">
        <i className="otheruser">@{msg.user}</i>
        </div>
        </div>
        </li>)
        }
        else{
   return( 
    <li className="currentusermsg">
    <div className="row">
        <div className="col-3">
    <i className="currentuser">@{msg.user}</i>
        </div>
        <div className="col-9">
        <p>{msg.text}</p>
        </div>
        </div>
       </li>
       )
     }
   })}
   </ul>
    </div>
  );
}

export default Messages;