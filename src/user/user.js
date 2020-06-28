import React, { useState, useEffect } from 'react';
import Rooms from 'rooms/rooms';
import { Redirect } from 'react-router-dom';
import ReactAnime from 'react-animejs'
const {Anime, stagger} = ReactAnime;

let interval;
export default function User() {

    const [user,setuser]=useState('');

const changeduser=(e)=>{
setuser(e.target.value);
}

const getuser=()=>{

if(user==="" || user===null){
    alert("please insert a user name")
}else{
    localStorage.setItem('user',user);
}
}

useEffect(()=>{

 try{

  if(window.devicePixelRatio===2){
    var val= document.querySelector("h2");
    var mob= document.querySelector("h3");
    val.style.fontSize="20px";
    val.style.color="rgb(204, 204, 102)";
    mob.style.fontSize="15px";
    mob.style.width="80%"
    mob.textContent="you are connected from mobile ! we will bring an app for you in mobile soon! please be patient"
   }

  var count =0;
  var text = document.getElementById("hometitle");
 interval =  setInterval(() => {
    try{
      if(count===0)
      {
        text.textContent="Welcome 😬";
       text.style.transition="2s"
        count=1;
      }
       else{
        if(count===1)
        {
          text.textContent="Choose a user name 😱";
          text.style.transition="2s"
          count=2;
        }else{
          text.textContent="Join many rooms 😂";
          text.style.transition="2s"
          count=0;
        }
       }
    }
    catch{
   clearInterval(interval);
    }
   },4000);
 }catch{
  clearInterval(interval)
 }

});


  return (
    <div style={{width:"100%"}}>
    <div className="back covertemplate">
    {
        localStorage.getItem('user')!==null?
        <Redirect to="/rooms"/>
        :
        (
    <form className="formuser">
    <br/>
    <div className="form-row textstyle">
    <h2 id="hometitle">Hello ! 😷 🙃 🙊</h2>
    </div>
    <br/>
    <div className="form-row">
  <input onChange={changeduser} type="text" className="form-control inputuser" placeholder="Enter a user name"/>
    </div>
    <div className="form-row">
     <button onClick={()=>getuser()} type="submit" className="btn btnuser">Join</button>
    </div>
    <br/><br/>
    </form>
        )
    }
    </div>
    <h3></h3>
    </div>
  );
}

