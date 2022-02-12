import React, { useState } from "react";
import "./ProfileName.css";
import NavBar from "../../Component/Navbar/Navbar";
import ProfileF from "../../Component/Profile(F)/Profile(F)";


function ProfileName() {
    const params = new URL(document.location).searchParams;
    const user = params.get("username");
    const username = localStorage.getItem("username");
  const pass=localStorage.getItem('password');

  return (
    <div>
        <NavBar userid={username} password={pass} />
        <ProfileF
            user={user}
        />
    </div>
  )
}

export default ProfileName;