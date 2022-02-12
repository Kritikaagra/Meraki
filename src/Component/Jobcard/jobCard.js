import React from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";
import './jobCard.css';

function jobCard({name,time,id}) {
  return (
    <div className='Jbox'>
    <div className="Jheader">
    <IoPersonCircleOutline className='person'/>
    <div className="Jheaderflex">
      <div className="Jname">{name}</div>
      <div className="Jtime">{time}</div>
      <div className="Jid">{id}</div>
    </div>
    </div>
  </div>
  )
}

export default jobCard