import React,{useEffect, useState} from 'react';
import querystring from 'query-string';
import { Redirect, Link } from 'react-router-dom';
import Messages from 'messages/messages';
import io from 'socket.io-client';
import Emojify,{emojify} from 'react-emojione';
import Video from 'videochat/video';
const ENDPOINT ="http://localhost:3300/"
let socket;

export default function Chat({location}) {




const [title,settitle]=useState(querystring.parse(location.search).title);
const [key,setkey]=useState(querystring.parse(location.search).key);
const [localmessage,setlocalmessage]=useState('');
const [video,setvideo]=useState(false);


const getout=()=>{
    localStorage.removeItem('user');
    window.location.reload();
}

const onMessageChanged =(e)=>{
setlocalmessage(e.target.value);
}

const onvideoclick=()=>{
    setvideo(true);
}

const sendmessages=()=>{
socket = io(ENDPOINT);
const name = localStorage.getItem('user');
const msg = localmessage;
const room=key;
socket.emit('sendMessage',{name:name,msg:msg,room:room});
document.getElementById('msg').value="";
setlocalmessage('');
}

//display emoji on textarea
const OnImojiClick=(title)=>{
    var text = document.getElementById('msg');
    text.value = text.value + emojify(title, {output: 'unicode'});
    setlocalmessage(text.value);
}

return (
    <div className=" container-fluid">
   {
       localStorage.getItem('user')!==null?
       (
    <div>
    
<div className="navbar">
<Link to="/rooms"><button className="btn btn-outline-dark" type="button">or back!</button></Link>
<button onClick={()=>getout()} className="btn btn-outline-danger" type="button">Get Out !</button>
</div>
    <br/><br/>
    <div className="navbar text-danger font-weight-bolder bg-dark">
   <h2>{title}</h2>
   </div>  
   <div className=" bg-info overflow-scroll">
   <div style={{minHeight:"400px"}} className="row thecontainer">
   <div id="scrolldiv" className="col-sm-12 justify-content-end scrolledarea">
  {video===true?
(
    <Video video={[{src:"www.hs.com",component:<Messages room={[{room:key,msg:localmessage}]} />,room:key}]} />
):
(
    <Messages room={[{room:key,msg:localmessage}]}/>
)}
   </div>
   </div>
   <div className="row allform ">
   <div className="col-md-12">
   <textarea 
   value={localmessage} 
   id="msg" onChange={onMessageChanged} 
   type="text" className="form-control" 
   placeholder="type Message...">
   </textarea>
   <button 
   onClick={()=>sendmessages()}
   type="submit" 
   className="btn btn-success btnsend">
   Send
   </button>
   <button 
   onClick={()=>onvideoclick()} 
   type="submit" 
   className="btn btn-danger btnvideo">
   Record video
   </button>
   <button className="btn btn-outline-light btnvideo w-75">
   <Emojify style={{height: 32, width: 32}} onClick={e =>OnImojiClick(e.target.title)}>
        <span>:wink:</span>
        <span>😸 :D  ^__^ :/ :'( :( :p 😂 😨 😬 😰 😱 😴 😵 😷 🙃 🙊 🙉 🙈</span>
    </Emojify>
   </button>
   </div>
   </div>
   <br/>
   </div>
   <br/><br/>  
           </div>
       )
       :
       <Redirect to="/" />
   }
    </div>
  );
}
