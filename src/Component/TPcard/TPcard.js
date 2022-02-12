import React, {useState} from 'react';
import './TPcard.css';

function TPcard() {
    var [tdata, setTdata] = useState('');
  return (
      <>
    <div className='Thead'>Add your T&P cell information for better reach</div>
    <textarea name="Tinfo" id="Tinfo" placeholder='Write something about yourself...'  onChange={(e)=>{setTdata(e.target.value)}}/>
    <div className='TfinalInfo'>{tdata}</div>
    </>
  )
}

export default TPcard;