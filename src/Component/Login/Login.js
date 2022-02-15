import React,{useState} from 'react'
import { Redirect, Link } from 'react-router-dom';
import "./Login.css";
import man_sitting from '../../Assets/man_sitting.webp'
import db from '../../Firebase';
import {
  collection,
  getDocs,
} from "firebase/firestore";


function Login() {
     var[userid,setuserid]=useState();
     var[password,setpassword]=useState();
     var[phone,setPhone]=useState([]);
     var[email,setemail]=useState([]);
     var [tester, setTester] = useState(true);
     var[loggedin,setloggedin]=useState(false);
  
async function getInfo() {
  const register = collection(db, "registeration");
  var amb_doc = await getDocs(register);
  phone = amb_doc.docs.map((doc) => doc.data().PhoneNo);
  email = amb_doc.docs.map((doc) => doc.data().EmailId);
  setPhone(phone);
  setemail(email);
}

if (tester == true) {
  window.addEventListener("load", getInfo());
  setTester(false);
}

function checkCredentials(e){
  
  if(phone.includes(userid) && email.includes(password)){
    localStorage.setItem("token","meraki");
    localStorage.setItem("username",userid);
    localStorage.setItem("password",password);
    e.preventDefault();
    setloggedin(true);     
  }
  else{
    //console.log(loggedin);
    window.alert("Wrong Password or Username");
    
  }
}
   
   const token=localStorage.getItem("token");
   let loggedinsecond=true;
   if(token==null)
   {
     loggedinsecond=false;
   }
   if(loggedinsecond==true)
   {
     userid = localStorage.getItem("username");
     password = localStorage.getItem("password");
     return <Redirect to={"/homepage?username="+ userid +"&password=" + password}/>
   }
   else if(loggedin==true)
   {
     return <Redirect to="/"/>
   }
   else{
  return (
    
     <div id="logincontainer">
        
        <div id="loginbox">
            <div id="loginlogo"> <img id="login_man-sitting"src={man_sitting} alt=""/></div>
            <div id="loginmain">
              <div id="logincompo1"> <h2 id="h2comp1">Login For MERAKI</h2> </div>
              <br/>
              <div id="logincompo2"> <input type="text" id="loginadmin" className="con"  placeholder= "Phone No" 
               onChange={(e)=>
             {
               setuserid(e.target.value)
             }}

            /></div>
              <div id="logincompo3"> <input type="password" id="loginpass" className="con" placeholder="Password(Email)"
                onChange={(e)=>
             {
                setpassword(e.target.value)
             }}

            /></div>
              <br/>
              <div id="logincompo4"><button id="loginbut" onClick={checkCredentials} >LOGIN</button></div>
              <Link to="/signIn">
              <div className='newUser'>New User? Sign in</div>
              </Link>
            </div>
        </div>
    </div>
  );
           }
}



export default Login;

