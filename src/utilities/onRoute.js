import { navBarCollapseTransition } from './navBarCollapseTransition';

import { CSSRulePlugin, TweenLite } from "gsap/all";

import routeSound from '../audio/MainAudio/on_route.mp3';

export const onRoute = () => {
  
  const rSound = new Audio(routeSound);
  rSound.playbackRate = 3.2;
  rSound.volume = 0.5;
  rSound.play();
  
  const position = document.getElementById("routes");
  position.scrollIntoView({behavior: "smooth"});
  
  navBarCollapseTransition();

  //background image transition
  
  const main_BG = CSSRulePlugin.getRule(".mainScreen:before");
  // console.log("main_BG", main_BG);
  TweenLite.to(main_BG, 2, {cssRule:{opacity: 0.9}});
  setTimeout(() => {
    TweenLite.to(main_BG, 2.5, {cssRule:{filter: "blur(12px)"}});
  }, 1500);

  // moon trans
  
  const moon_BG = CSSRulePlugin.getRule(".mainScreen:after");
  // console.log("main_BG", moon_BG);
  setTimeout(() => {
    TweenLite.to(moon_BG, 2.5, {cssRule:{filter: "blur(12px)"}});
  }, 1500);
};