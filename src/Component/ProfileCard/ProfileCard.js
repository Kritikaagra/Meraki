import React, {useState} from 'react';
import './ProfileCard.css';
import { ImProfile } from "react-icons/im";
import db from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";

function ProfileCard() {
  const username = localStorage.getItem("username");
  const pass = localStorage.getItem("password");

  var [tester, setTester] = useState(true);
  var [Data, setData] = useState([]);

  async function getInfo() {
    const register = collection(db, "registeration");
    var amb_doc = await getDocs(register);
    var data = amb_doc.docs.map((doc) => doc.data());
    var so=[];
    data.forEach((doc) => {
      if (doc.PhoneNo == username && doc.EmailId == pass) {
        so.push(doc);
      }   
    });  
    setData(so);
    console.log(Data);
  }

  if (tester == true) {
    window.addEventListener("load", getInfo());
    setTester(false);
  }
  return (
    <div className='profileBox'>
        <div className='Phead'>Your Profile</div>
        <div className="rowflex">
        <ImProfile style={{fontSize:'4rem'}}/>
        <div className="info">
        {Data.map((item,i)=>{
          return(
            <div key={i}>
            <div className="infoName">{item.Name}</div>
            <div className="infoEmail">{item.EmailId}</div>
            <div className="infoPhone">{item.PhoneNo}</div>
            </div>
          )
        })}
        </div>
        </div>
    </div>
  )
}

export default ProfileCard;