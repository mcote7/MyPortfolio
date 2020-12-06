import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import '../../css/navbar.css';

import SpeechNavigation from './SpeechNavigation';

const NavBar = ({history}) => {

  const [loading, setLoading] = useState(true);
  const [showHomeButton, setShowHomeButton] = useState(false);
  useEffect(() => {
    setTimeout(()=> {
      setLoading(false);
      setShowHomeButton(true);
    }, 12000)
    setTimeout(() => {
      setShowHomeButton(false);
    }, 13500);
  },[]);

  useEffect(()=> {
    if(!loading) {
      const NAV = document.getElementById('myNavbar');
      NAV.animate([
        {bottom: '-88px', opacity: 0, filter: 'blur(12px)', backgroundColor: 'rgb(97, 218, 251)', borderColor: 'black'},
        {borderColor: 'hsl(275, 100%, 48%)', filter: 'blur(2px)', opacity: 0.8},
        {borderColor:' hsl(336, 78%, 46%)'},
        {bottom: '0px', borderColor:  'hsl(13, 100%, 64%)'},
        {borderColor:  'hsl(108, 100%, 68%)'},
        {bottom: '0px', opacity: 1, filter: 'blur(0px)', backgroundColor: 'rgba(0, 0, 0, 0.8)', borderColor: 'rgba(97, 218, 251, 0.8)'}
      ], {
        duration: 2250,
        easing: 'ease-out'
      });
    }
  },[loading])

  const [navtoggle, setNavtoggle] = useState(false);
  const [navtoggleIcon, setNavtoggleIcon] = useState("bars");
  const [navtoggleBackgroundcolor, setNavtoggleBackgroundcolor] = useState("hsl(193, 95%, 48%)");
  const [navtoggleClippath, setNavtoggleClippath] = useState("polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)");
  useEffect(() => {
    if(navtoggle) {
      setNavtoggleIcon("chevron-circle-down");
      setNavtoggleBackgroundcolor("hsl(193, 95%, 68%)");
      setNavtoggleClippath("polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)")
    }
    else if(!navtoggle) {
      setNavtoggleIcon("bars");
      setNavtoggleBackgroundcolor("hsl(193, 95%, 48%)");
      setNavtoggleClippath("polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)");
    }
  },[navtoggle]);

  useEffect(() => {
    const targetnavbar = document.getElementById("navbarText");
    setTimeout(() => {
      if(targetnavbar !== null && !targetnavbar.classList.contains("show")) {
        setNavtoggle(false);
      }
    }, 1500);
  },[history.location]);

  useEffect(() => {
    if(history.location.pathname === '/michael-cote-profile-2020') {
      setShowHomeButton(false);
    }
    else {
      setShowHomeButton(true);
    }
  },[history.location.pathname]);

  if(loading) return null;
  return (
    <nav id="myNavbar" className="navbar navbar-expand-lg myNavBar">

      <div className="homeButtonWrap">
      {showHomeButton ?
        <NavLink className="homeButton" to="/">
          <span><i className="fa fa-home fa-2x" aria-hidden="true"></i></span>
        </NavLink> :
        <div className="homeButtonActivePlaceholder"></div>}
      </div>

      <button 
        onClick={()=>{setNavtoggle(!navtoggle)}}
        style={{clipPath: `${navtoggleClippath}`, backgroundColor: `${navtoggleBackgroundcolor}`}}
        className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span><i className={`fa fa-${navtoggleIcon} barsIcon`} aria-hidden="true"></i></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav m-auto">
          <li className="nav-item">
            <NavLink className="polyLink" activeClassName="polyLink-active" to="/technical">
              <span className="polyLink-icon"><i className="fa fa-cog fa-2x" aria-hidden="true"></i></span>
              <span className="polyLink-text">Technical&nbsp;</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="polyLink" activeClassName="polyLink-active" to="/education">
              <span className="polyLink-icon"><i className="fa fa-graduation-cap fa-2x" aria-hidden="true"></i></span>
              <span className="polyLink-text">Education</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="polyLink" activeClassName="polyLink-active" to="/projects">
              <span className="polyLink-icon"><i className="fa fa-th-list fa-2x" aria-hidden="true"></i></span>
              <span className="polyLink-text">Projects&nbsp;&nbsp;&nbsp;</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="polyLink" activeClassName="polyLink-active" to="/resume">
              <span className="polyLink-icon"><i className="fa fa-file-text-o fa-2x" aria-hidden="true"></i></span>
              <span className="polyLink-text">Resume&nbsp;&nbsp;&nbsp;</span>
            </NavLink>
          </li>
        </ul>
        <div className="speechNavigationWrap">
          <SpeechNavigation history={history}/>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;