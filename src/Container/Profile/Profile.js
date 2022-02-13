import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import NavBar from "../../Component/Navbar/Navbar";
import ProfileCard from "../../Component/ProfileCard/ProfileCard";
import Post from "../../Component/Post/Post";
import TPcard from "../../Component/TPcard/TPcard";
import JobCard from "../../Component/Jobcard/jobCard";
import db from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";

function Profile() {
  const username = localStorage.getItem("username");
  const pass = localStorage.getItem("password");

  var [who, setWho] = useState("cell");
  var [tester, setTester] = useState(true);
  var [companyData, setcompanyData] = useState([]);
  var [cellData, setcellData] = useState([]);
  var [postFinal, setPostFinal] = useState([]);

  async function getPost() {
    const post = collection(db, "posts");
    var post_doc = await getDocs(post);
    var postDoc = post_doc.docs.map((doc) => doc.data());
    var so = [];
    postDoc.forEach((doc) => {
      if (doc.companyName == companyData[0].Name) {
        so.push(doc);
      }
    });
    setPostFinal(so);
  }

  async function getjobInfo() {
    const post = collection(db, cellData[0].Name);
    var post_doc = await getDocs(post);
    var postDoc = post_doc.docs.map((doc) => doc.data());
    var soo = [];
    postDoc.forEach((doc) => {
      soo.push(doc);
    });
    setPostFinal(soo);
  }

  async function getInfo() {
    const register = collection(db, "registeration");
    var amb_doc = await getDocs(register);
    var data = amb_doc.docs.map((doc) => doc.data());
    data.forEach((doc) => {
      if (doc.PhoneNo == username && doc.Organisation == "campany") {
        companyData.push(doc);
        setWho("company");
        getPost();
      }
    });
    data.forEach((doc) => {
      if (doc.PhoneNo == username && doc.Organisation == "cell") {
        cellData.push(doc);
        setWho("cell");
        getjobInfo();
      }
    });
    setcompanyData(companyData);
    setcellData(cellData);
    setPostFinal(postFinal);
  }

  if (tester == true) {
    window.addEventListener("load", getInfo());
    setTester(false);
  }

  return (
    <div>
      <NavBar userid={username} password={pass} />
      <div className="profileHome">
        <div
          className="leftSideProfile"
          style={who == "company" ? { display: "flex" } : { display: "none" }}
        >
          <div className="postSec">Your Post</div>
          {postFinal.length == 0 ? `You haven't post anything yet!` : ""}
          <div className="scroll">
            {postFinal.map((item, i) => {
              return (
                <Post
                  key={i}
                  jd={item.jd}
                  companyName={item.companyName}
                  time={item.timestamp}
                  id={item.id}
                  apply={who == "company" ? "none" : "block"}
                />
              );
            })}
          </div>
        </div>

        <div
          className="leftSideProfile"
          style={who == "cell" ? { display: "flex" } : { display: "none" }}
        >
          <div className="postSec">Your Application</div>
          {postFinal.length == 0 ? `You haven't apply anywhere yet!` : ""}
          <div className="scroll">
            {postFinal.map((item, i) => {
              return (
                <Link
                  to={"/profilename?username=" + item.cell}
                  key={i}
                  className="linkCard"
                >
                  <JobCard name={item.cell} time={item.date} id={item.jobId} />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rightSideprofile">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}

export default Profile;
