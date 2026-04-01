"use client";

import { useRef, useState } from "react";

import styles from "../styles/EmotionSoundPlayer.module.css";

export default function EmotionSoundPlayer({sound,onUse}:any){

const audioRef = useRef<HTMLAudioElement | null>(null);

const [playing,setPlaying] = useState(false);

function togglePlay(){

if(!audioRef.current) return;

if(playing){

audioRef.current.pause();
setPlaying(false);

}else{

audioRef.current.play();
setPlaying(true);

}

}

function handleUse(){

onUse(sound);

}

return(

<div className={styles.player}>

<audio
ref={audioRef}
src={sound.file_url}
/>

<button
className={styles.play}
onClick={togglePlay}
>

{playing ? "❚❚" : "▶"}

</button>

<div className={styles.info}>

<b>{sound.title}</b>

<span>{sound.duration}s</span>

<div className={styles.waveform}>

<span></span>
<span></span>
<span></span>
<span></span>
<span></span>

</div>

</div>

<button
className={styles.use}
onClick={handleUse}
>

Use

</button>

</div>

);

}
