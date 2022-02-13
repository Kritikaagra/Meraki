import React from 'react';
import {AiFillNotification} from 'react-icons/ai';
import './Post.css';
import db from "../../Firebase";
import {
  doc,
  setDoc,
} from "firebase/firestore";

function Post({jd, companyName, time, apply, id, cell}) {
  async function applyPost(e){
      e.target.disabled = true;
      e.target.style.backgroundColor = "gray";

      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()} @${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

      var collename= e.target.previousSibling.previousSibling.childNodes[1].childNodes[0].innerText;
      const applyData={
        cell: cell[0].Name,
        jobId: e.target.previousSibling.previousSibling.childNodes[1].childNodes[2].innerText,
        date: date,
      };
      const TData={
        cell: collename,
        jobId: e.target.previousSibling.previousSibling.childNodes[1].childNodes[2].innerText,
        date: date,
      };
      var timestamp = String(new Date().getTime());
      await setDoc(doc(db, collename , timestamp), applyData);
      await setDoc(doc(db, cell[0].Name , timestamp), TData);
      alert("Congratulations! Your information has been saved successfully.");

      e.target.disabled = false;
      e.target.innerText='Applied';
   }
  return (
    <>
      <div className="postDiv">
        <div className="header">
          <AiFillNotification className='speaker'/>
          <div className="postheaderflex">
            <div className="Cname">{companyName}</div>
            <div className="Ptime">{time}</div>
            <div className="Pid">Job id: {id}</div>
          </div>
        </div>
        <div className="Ptext">
          {jd}
        </div>
        <button className='apply_but' style={{display: `${apply}`, cursor:'pointer'}} onClick={applyPost}>Apply</button>
      </div>
    </>
  )
}

export default Post;