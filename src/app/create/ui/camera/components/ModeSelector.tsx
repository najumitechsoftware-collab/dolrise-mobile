"use client";

import styles from "../styles/ModeSelector.module.css";

interface Props{
mode:string;
setMode?: (mode:string)=>void;
}

/*
DolRise Camera Modes
Aura    = filters / effects studio
Emotion = realtime emotion recording
Photo   = capture photo
Gallery = upload video/photo
*/

const modes = ["Aura","Emotion","Photo","Gallery"];

export default function ModeSelector({mode,setMode}:Props){

return(

<div className={styles.wrapper}>

<div className={styles.modes}>

{modes.map((m)=>{

const active = m===mode;

return(

<button
key={m}
className={`${styles.mode} ${active ? styles.active : ""}`}
onClick={()=>setMode && setMode(m)}
>

{m}

</button>

);

})}

</div>

</div>

);

}
