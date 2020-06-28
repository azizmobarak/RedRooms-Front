import React,{useEffect,useState} from 'react';
import Rooms from 'rooms/rooms';
import Chat from 'chat/chat';
import User from 'user/user';
import {BrowserRouter as Router , Route , Switch,Link} from 'react-router-dom';
import logo from 'images/logo.png';



const App=()=> {

const showhide=()=>{
  var list = document.getElementById('showhide');
  if(list.style.display==='none')
  {
    list.style.display="block";
  }else{
    list.style.display="none";
  }
}
//document.querySelectorAll(".mvp-feat1-list-text>h2")[0].textContent
  return (
    <div className="h-100">
    <nav className="navbar navbar-expand bg-danger shadow">
    <div className="navbar-brand font-weight-bolder text-white logo"><img height="60" src={logo}/></div>
   {
    window.devicePixelRatio===1?
    (
    <div className=" navbar-collapse w-100 justify-content-end border-0">
    <ul className="nav text-center text-white">
    <li className="list-item bg-danger">Home</li>
    <li className="list-item bg-danger">Contact</li>
    <li className="list-item bg-danger">About</li>
    </ul>
   </div>
    ):
    (
      <div className=" navbar-collapse w-100 justify-content-end">
      <button onClick={()=>showhide()} className="btn btn-outline-light" >Show</button>
      </div>
    )
    
   }
    </nav>
    <nav id="showhide" className="nav justify-content-center w-100">
    <br/>
      <div>
    <ul className="nav text-center text-white">
    <li className="list-item bg-danger">Home</li>
    <li className="list-item bg-danger">Contact</li>
    <li className="list-item bg-danger">About</li>
    </ul>
      </div>
    </nav>
    <div className="h-100">
    <Router>
    <Switch>
    <Route exact path="/" component={User} />
    <Route exact path="/rooms" component={Rooms} />
    <Route exact path="/chat" component={Chat} />
    </Switch>
    </Router>
    </div>
    <br/><br/>
  <footer className="footer text-center text-primary">
Created by @Aziz Mobarak - 2020
  </footer>
    </div>
  )
}

export default App;
