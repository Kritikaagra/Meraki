import React, { useState } from "react";
import "../ProfileCard/ProfileCard.css";
import './Profile(F).css';
import { ImProfile } from "react-icons/im";
import db from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";

function ProfileF({user}) {

    var [tester, setTester] = useState(true);
    var [info, setInfo]= useState([]);

    async function getInfo() {
        const register = collection(db, "registeration");
        var amb_doc = await getDocs(register);
        var data = amb_doc.docs.map((doc) => doc.data());
        var so=[];
        data.forEach((doc)=>{
            if(doc.Name == user){
                so.push(doc);  
            }
        })
        setInfo(so);
    }

    if (tester == true) {
        window.addEventListener("load", getInfo());
        setTester(false);
      }

  return (
    <div className="profileBox">
      <div className="Phead">{user}'s Profile</div>
      <div className="rowflex">
        <ImProfile style={{ fontSize: "4rem" }} />
        <div className="info">
        {info.map((item,i)=>{
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
  );
}

export default ProfileF;
