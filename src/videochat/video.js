import React,{useEffect, useState} from 'react';
import io from 'socket.io-client';

const ENDPOINT="http://localhost:3300/"
let socket;
export default function Video(props) {

const [src,setsrc] = useState('');
 //camera
useEffect(()=>{
  socket = io.connect(ENDPOINT);  
  /* Setting up the constraint */
  var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
  var constraints = {
    audio: false,
    video: {
     facingMode: facingMode
    }
  };
  /* Stream it to video element */
  navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
    try {
     // socket.emit('stream',{ data:"hello", room:props.video[0].room, user:localStorage.getItem('user') });
      video.srcObject = stream;
      //setsrc(stream);
    } catch (error) {
  // setsrc(URL.createObjectURL(stream));
  // socket.emit('stream',{ data:"hello", room:props.video[0].room, user:localStorage.getItem('user') });

   video.srcObject = URL.createObjectURL(stream);
    }
  });
  //get result
  var video = document.getElementById('video');
  //setInterval(() => {
    socket.on("video",(data)=>{
      alert(data);
     // video.srcObject=data;
      console.log(data);
    }); 

  
  //}, 1000);
});

useEffect(()=>{
 
},[src])


  return (
    <div className="row">
    <div className="col-sm-6 bg-light">
    <video id="video" style={{width:"100%",height:"350px"}} autoPlay="true">Coming Soon</video>
       <br/>
        <canvas style={{display:"none"}} id="preview"></canvas>
        <div id="log"></div>
    </div>
    <div className="col-sm-6">
     {props.video[0].component}
    </div>
    <br/>
    </div>
  );
}
