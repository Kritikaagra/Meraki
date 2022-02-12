import React, {useState} from 'react';
import { Link } from 'react-router-dom';
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

  var [who, setWho] = useState("cell");
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
        setWho('company');
          getFinalData();
      }
      else if(doc.PhoneNo == username && doc.Organisation == 'cell'){
        companyName = doc.Name;
          setWho('cell');
          getFinalData();
      }
    });
  }

  async function getFinalData(){
    const applied = collection(db, companyName);
    var app_doc = await getDocs(applied);
    final = app_doc.docs.map((doc) => doc.data());
    setfinal(final);
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

      <div className="Jhead">{who == 'cell'? 'See where your apply' : 'See how many T&P cell applied for you job'}</div>
      <div className="Jdiv">
      {
        (final.length == 0 && who == 'cell') ? `You havent apply anywhere yet!` : ''
      }
      {
        (final.length == 0 && who == 'company') ? `No one applied yet!` : ''
      }
      {   
        final.map((item,i)=>{
          return(
            <Link to={'/profilename?username='+ item.cell}>
            <JobCard
              key={i}
              name={item.cell}
              time={item.date}
              id={item.jobId}
            /></Link>
          );
      })}
      
    
      </div>
    </div>
  )
}

export default JobSection;