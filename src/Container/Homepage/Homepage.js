import React, { useState } from "react";
import NavBar from "../../Component/Navbar/Navbar";
import AddPost from "../../Component/AddPost/AddPost";
import Post from "../../Component/Post/Post";
import "./HomePage.css";
import db from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";

function Homepage() {
  const params = new URL(document.location).searchParams;
  const username = localStorage.getItem("username");
  const pass = localStorage.getItem("password");

  var [who, setWho] = useState("cell");
  var [tester, setTester] = useState(true);
  var [companyData, setcompanyData] = useState([]);
  var [cellData, setcellData] = useState([]);
  var [postData, setpostData] = useState([]);
  var [postid, setpostid] = useState([]);

  async function getInfo() {
    const register = collection(db, "registeration");
    const post = collection(db, "posts");
    var amb_doc = await getDocs(register);
    var post_doc = await getDocs(post);
    var data = amb_doc.docs.map((doc) => doc.data());
    postid = post_doc.docs.map((doc) => doc.id);
    postData = post_doc.docs.map((doc) => doc.data());
    data.forEach((doc) => {
      if (doc.PhoneNo == username && doc.Organisation == "campany") {
        companyData.push(doc);
        setWho("company");
      }
    });
    data.forEach((doc) => {
      if (doc.PhoneNo == username && doc.Organisation == "cell") {
        cellData.push(doc);
        setWho("cell");
      }
    });
    setcompanyData(companyData);
    setcellData(cellData);
    setpostData(postData);
    setpostid(postid);
  }

  if (tester == true) {
    window.addEventListener("load", getInfo());
    setTester(false);
  }

  return (
    <div>
      <NavBar userid={username} password={pass} />
      <div className="companyHome">
        <div className="leftSide">
          <div className="postSec">Post Section</div>
          {postData.map((post, i) => {
            return (
              <Post
                key={i}
                jd={post.jd}
                companyName={post.companyName}
                time={post.timestamp}
                id={postid[i]}
                cell={cellData}
                apply={who == "company" ? "none" : "block"}
              />
            );
          })}
        </div>
        <div
          className="rightSide"
          style={who == "company" ? { display: "block" } : { display: "none" }}
        >
          <div className="righttext">
            Want to hire college students? <br />
            Create a post here
          </div>
          <AddPost company={companyData} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
