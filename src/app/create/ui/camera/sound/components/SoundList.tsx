"use client";

import { useRef, useState } from "react";
import styles from "../styles/SoundList.module.css";

export default function SoundList({ sounds, onSelect }: any) {

const audioRef = useRef<HTMLAudioElement | null>(null);

const [playingId,setPlayingId] = useState<string | null>(null);

/* =========================
PLAY / PAUSE
========================= */

function handlePreview(sound:any){

if(!audioRef.current) return;

if(playingId === sound.id){

audioRef.current.pause();
setPlayingId(null);
return;

}

audioRef.current.src = sound.file_url;

audioRef.current.play();

setPlayingId(sound.id);

}

/* =========================
EMPTY
========================= */

if(!sounds?.length){

return(

<div className={styles.empty}>

No emotion sounds yet

</div>

);

}

/* =========================
UI
========================= */

return(

<div className={styles.list}>

<audio ref={audioRef} />

{sounds.map((s:any)=>{

const playing = playingId === s.id;

return(

<div key={s.id} className={styles.card}>

{/* USER INFO */}

<div className={styles.userRow}>

<img

src={s.author?.avatar_url || "/avatar.png"}

className={styles.avatar}

/>

<div className={styles.userText}>

<span className={styles.username}>

@s.author?.username || "user"

</span>

<span className={styles.title}>

{s.title}

</span>

</div>

</div>


{/* PLAYER */}

<div className={styles.playerRow}>

<button

className={styles.play}

onClick={()=>handlePreview(s)}

>

{playing ? "❚❚" : "▶"}

</button>


<div className={styles.waveform}>

<span></span>

<span></span>

<span></span>

<span></span>

<span></span>

</div>


<span className={styles.duration}>

{s.duration}s

</span>

</div>


{/* FOOTER */}

<div className={styles.footer}>

<span className={styles.category}>

{s.category?.name || "Emotion"}

</span>

<button

className={styles.use}

onClick={()=>onSelect(s)}

>

Use

</button>

</div>

</div>

);

})}

</div>

);

}
