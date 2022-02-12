import React, {useState} from 'react';
import NavBar from "../../Component/Navbar/Navbar";
import JobCard from '../../Component/Jobcard/jobCard';
import './JobSection.css';
import db from '../../Firebase';
import {
  collection,
  getDocs,
} from "firebase/firestore";

function JobSection() {
  const params = new URL(document.location).searchParams;
  const username = localStorage.getItem("username");
  const pass=localStorage.getItem('password');

  var [tester, setTester] = useState(true);
  var [companyName, setcompanyName] = useState('');
  var [final, setfinal] = useState([]);

  async function getJInfo() {
    const register = collection(db, "registeration");
    var amb_doc = await getDocs(register);
    var data = amb_doc.docs.map((doc) => doc.data());
    data.forEach((doc)=>{
      if(doc.PhoneNo == username && doc.Organisation == 'campany'){
        companyName = doc.Name;
          getFinalData();
      }
    });
  }

  async function getFinalData(){
    const applied = collection(db, companyName);
    var app_doc = await getDocs(applied);
    final = app_doc.docs.map((doc) => doc.data());
    setfinal(final);
    console.log(final.length)
  }

  if (tester == true) {
    window.addEventListener("load", getJInfo());
    setTester(false);
  }

  return (
    <div>
      <NavBar
      userid={username}
      password={pass} />

      <div className="Jhead">See how many T&P cell applied for you job</div>
      <div className="Jdiv">
      {final.map((item,i)=>{
          return(
            <JobCard
              key={i}
              name={item.cell}
              time={item.date}
              id={item.jobId}
            />
          )
      })}
      </div>
    </div>
  )
}

export default JobSection;