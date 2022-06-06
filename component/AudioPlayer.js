import React,{useState,useRef,useEffect} from 'react'
import styles from "../styles/AudioPlayer.module.css";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

import {RiArrowGoForwardLine,RiArrowGoBackLine} from "react-icons/ri"



const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const progressBar = useRef();
  const animationRef = useRef();


  const togglePlaying = () => {
    var preValue = isPlaying;
    setIsPlaying(!preValue);
    
    if (!preValue) { 
      audioPlayer.current.play();
       animationRef.current= requestAnimationFrame(whilePlaying);
    } else {
   
      audioPlayer.current.pause();
       cancelAnimationFrame(animationRef.current);
    }
  }
 
  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changeCurrentTime();
    
    if (progressBar.current.value == Math.floor(duration)) {
      
     return setIsPlaying(false);
   }
  requestAnimationFrame(whilePlaying);
 }

  const caculateTime = (secs) => {
    const time = Math.floor(secs);
    const minutes = Math.floor(time / 60);
    const returnMinute = minutes > 10 ? `${minutes}` : `0${minutes}`;
    const seconds = Math.floor(time % 60);
    const reuturnSecond = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMinute}:${reuturnSecond}`;
 }

  const changeCurrentTime = () => {
      progressBar.current.style.setProperty("--seek-before-width", `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }
  
  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changeCurrentTime();
  }
  
  const handlePlayBack = () => {
    progressBar.current.value = Number(progressBar.current.value) - 30;
    changeRange();
  }

  const handlePlayForward = () => {
    progressBar.current.value = Number(progressBar.current.value) + 30;
    changeRange();
  }

  useEffect(() => {
    const seconds = Math.floor(audioPlayer?.current?.duration);
    progressBar.current.max=seconds;
    setDuration(seconds);
    
  },[audioPlayer?.current?.loadedmetadata,audioPlayer?.current?.readyState]) 

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioPlayer} src="https://cdn.trendybeatz.com/audio/Justin-Bieber-Ghost-(TrendyBeatz.com).mp3" />
      <button className={styles.arrowButton} onClick={handlePlayBack}><RiArrowGoBackLine/></button>
      <button onClick={togglePlaying} className={styles.playButton}>{!isPlaying ? <BsFillPlayFill/> : <BsFillPauseFill/>}</button>
      <button className={styles.arrowButton} onClick={handlePlayForward}><RiArrowGoForwardLine/></button>

      {/* current Time */}
      <div className={styles.time}>{ caculateTime(currentTime) }</div>

      {/* progress Bar */}
      <input type='range' className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={ changeRange }/>

      {/* duration Time*/}
      <div className={styles.time}>{duration > 0 && caculateTime
      (duration)}</div>
    </div>
  )
}

export { AudioPlayer };