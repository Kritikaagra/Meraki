import React, { useState } from "react";
import "./AddPost.css";
import db from "../../Firebase";
import {
  collection,
  getDocs,
  timestamp,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

function AddPost({ company }) {
var timestamp;
  function addPost() {
    var jd = document.getElementById("newPost");
    //console.log(company[0].Name);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()} @${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    //console.log(date, typeof(date));
    timestamp = String(new Date().getTime());
    const postData = {
      jd: jd.value,
      companyName: company[0].Name,
      timestamp: date,
      id: timestamp,
    };
    validateForm(postData);
  }

  function validateForm(postData) {
    if (postData.jd.length < 50) {
      alert("Job description cannot less than 50 letters.");
    } else {
      setInfo(postData);
    }
  }

  async function setInfo(postData) {
    document.getElementById("createPost_but").disabled = true;
    document.getElementById("createPost_but").style.backgroundColor = "gray";
    // var timestamp = String(new Date().getTime());
    await setDoc(doc(db, "posts", timestamp), postData);
    alert("Congratulations! Your information has been saved successfully.");

    document.getElementById("createPost_but").disabled = false;
    document.getElementById("createPost_but").style.backgroundColor = "#6788a5";
    document.getElementById('newPost').value = '';
  }

  return (

      <div className="addPost">
        <textarea
          name="post"
          id="newPost"
          cols="30"
          rows="15"
          placeholder="Write your job description here..."
          className="posttext"
        ></textarea>
        <button className="createPost" id="createPost_but" onClick={addPost} style={{cursor:'pointer'}}>
          Create
        </button>
      </div>
  );
}

export default AddPost;
