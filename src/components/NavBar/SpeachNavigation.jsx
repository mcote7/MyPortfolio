import React, { useEffect, useState } from 'react';

import { useSpeechRecognition } from 'react-speech-kit';
import { useSpeechSynthesis } from 'react-speech-kit';


const SpeachNavigation = ({history}) => {

  const [showSpeachInfo, setShowSpeachInfo] = useState(false);
  const handleMouseEnter = () => {
    setShowSpeachInfo(true);
  };
  const handleMouseLeave = () => {
    const info = document.getElementById('speachInfo');
    if(info !== null) {
      info.animate([
        {opacity: 1},
        {opacity: 0}
      ], {
        duration: 500
      });
      setTimeout(() => {
        setShowSpeachInfo(false);
      }, 501);
    }
  };

  const [value, setValue] = useState('');
  const { speak, voices } = useSpeechSynthesis();
  const voice = voices[9];
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });
  const [micIcon, setMicIcon] = useState("microphone-slash");
  
  const handleMouseDown = () => {
    listen();
    setMicIcon("microphone");
    console.log("listening")
  };
  
  const handleMouseUp = () => {
    stop();
    setMicIcon("microphone-slash");
    console.log("stopped listening")
  };
  const [thumbsUp, setThumbsUp] = useState(false);

  useEffect(()=>{
    
    const ROUTES = ["contact", "technical", "education", "projects", "resume"];
    
    console.log("result", value);
    
    if(ROUTES.includes(value)) {
      
      history.push(`/${value}`);
      
      setThumbsUp(true);
      
      setTimeout(() => {
        speak({text: `Michael's ${value} page`, voice});
      }, 2000);
      
      setTimeout(() => {
        setThumbsUp(false);
      }, 4000);
      
      setTimeout(() => {
        setValue('');
      }, 5000);
    }
    
    if(value === "home") {
      
      history.push('/');
      
      setThumbsUp(true);
      
      setTimeout(() => {
        speak({text: `Welcome home`, voice});
      }, 2000);
      
      setTimeout(() => {
        setThumbsUp(false);
      }, 4000);
      
      setTimeout(() => {
        setValue('');
      }, 5000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[value]);

  return (<>
    <div className="speach" 
      onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span><i className={`fa fa-${micIcon} fa-2x`} aria-hidden="true"></i></span>
    </div>

    {showSpeachInfo && !listening && value === '' && !thumbsUp ? 
      <div id="speachInfo" className="speachInfo">
        <h5 style={{borderBottom: '2px solid'}}>Voice activated navigation</h5>
          <div>1. Hold down <span style={{color: 'white'}}><i className="fa fa-microphone" aria-hidden="true"></i></span> button</div>
          <p>2. Try Saying :</p>
          <div style={{color: 'white'}}>" Contact "</div>
          <div style={{color: 'white'}}>" Technical "</div>
          <div style={{color: 'white'}}>" Education "</div>
          <div style={{color: 'white'}}>" Projects "</div>
          <div style={{color: 'white'}}>" Resume "</div>
          <p style={{color: 'white'}}>" Home "</p>
      </div>:''}

    {thumbsUp ? <>
      <div className="thumbsUp"><span role="img" aria-label="good-job">&#128077;</span></div>
      <p className="goodJob">"Great Job!"</p></>
    :''}

  </>);
};
export default SpeachNavigation;