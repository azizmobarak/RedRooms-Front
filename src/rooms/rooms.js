import React from "react";
import { useHistory, useLocation, Link, Redirect } from "react-router-dom";


const Rooms = () => {

const rooms =[
    {text:"Anime Room",key:"anime"},
    {text:"Movie Room",key:"movie"},
    {text:"Sport Room",key:"sport"},
    {text:"Cartoon Room",key:"cartoon"},
    {text:"Fitness Room",key:"fitness"},
    {text:"Series Room",key:"serie"},
    {text:"Travel Room",key:"travel"},
    {text:"Technology Room",key:"technology"},
    {text:"Trip Room",key:"trip"},
    {text:"Computer Room",key:"computer"},
]


const generaterooms = () => {
    return rooms.map(room=>(
    <div className="col-sm-4 roomswor">
    <br/>
    <div className="card bg-dark text-white" key={room.text}>
    <div className="card-header">
    <h2>{room.text}</h2>
    </div>
    <div className="card-body">
  <Link to={'/chat?title='+room.text+'&key='+room.key}>    
  <button  className="btn btn-success w-100">Join Now!</button>
  </Link>
    </div>
    <div className="card-footer">
    8 min ago
    </div>
    </div>
    <br/>
    </div>
         )
     )
    }
const getout=()=>{
    localStorage.removeItem('user');
    window.location.reload();
}
    return ( 
        <div>
        {
            localStorage.getItem('user')!==null?
            (
        <div className=" container-fluid">
        <br/>
        <button type="button" onClick={()=>getout()} className="btn btn-outline-danger" >Get Out !</button>
        <div className="row">
        <br/>
        {generaterooms()}
        </div>
        </div>
            )
            :
            <Redirect to="/" />
        }
        </div>
    )
}

export default Rooms;