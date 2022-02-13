import React from "react";
import { Redirect, Link } from 'react-router-dom';
import './SignIn.css'
import db from "../../Firebase";
import {
  collection,
  getDocs,
  timestamp,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

function SignIn() {
  return (
    <>
    <div className="background">
    <div className="centerDiv">
      <p className="payform-heading">REGISTRATION FORM</p>
      <div className="payform-container">
        <div method="POST" className="payform-form">
          <div className="field">
            {" "}
            <span className="payform-label">Full Name * </span>
            <br />
            <input
              className="payform-input"
              type="text"
              alt="Name"
              name="name"
              id="reg_name"
              required="required"
            />{" "}
          </div>

          <div className="field">
            <span className="payform-label">Email id* </span>
            <br />
            <input
              className="payform-input"
              type="Email"
              name="email"
              id="reg_email"
              required="required"
            />{" "}
          </div>

          <div className="field">
            <span className="payform-label">Phone No * </span>
            <br />
            <input
              className="payform-input"
              type="number"
              name="phone"
              required="required"
              id="reg_phone"
            />
          </div>
          <div className="field">
            <span className="payform-label">Company/T&P Cell *</span>
            <br />
            <select id="reg_s1" className="payform-input">
              <option selected hidden value="">
                --Select any one--
              </option>
              <option name="submit blog" value="campany">
                Company
              </option>
              <option name="sponsership" value="cell">
                T&P Cell
                </option>
                </select>

          </div>
          <button className="register" id='reg_button' onClick={register}>Register</button>
          <Link to="/">
              <div className='newUser'>Go to Login Page</div>
              </Link>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default SignIn;

function register(){
  var Name = document.getElementById("reg_name");
  var EmailId = document.getElementById("reg_email");
  var PhoneNo = document.getElementById("reg_phone");
  var Organisation = document.getElementById("reg_s1");
  
  

  const regData = {
    Name: Name.value,
    EmailId: EmailId.value,
    PhoneNo: PhoneNo.value,
    Organisation: Organisation.value,
    timestamp: serverTimestamp(),
  };

  validateForm(regData);
}

function validateForm(regData) {
  if (
    regData.Name == "" ||
    regData.EmailId == "" ||
    regData.PhoneNo == "" ||
    regData.Organisation == "" 
    
  ) {
    alert("Please fill up the required fields.");
  } else if (regData.PhoneNo.length != 10) {
    alert("phone number should be of length 10.");
  } else if (
    !/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(regData.EmailId)
  ) {
    alert("Please enter a valid email address.");
  } else {
    setInfo(regData);
  }
}

async function setInfo(regData) {
  document.getElementById('reg_button').disabled = true
  document.getElementById('reg_button').style.backgroundColor="gray"
  var timestamp = String(new Date().getTime());
  await setDoc(doc(db, "registeration", timestamp), regData);
  alert("Congratulations! Your information has been saved successfully.");

  document.getElementById('reg_button').disabled = false
  document.getElementById('reg_button').style.backgroundColor = '#6788a5'
}
