"use client";

import styles from "../styles/RecordControls.module.css";

export default function RecordControls({ controls }: any){

if(!controls) return null;

return(

<div className={styles.controls}>

<div className={styles.timer}>
{controls.timer}s
</div>

{!controls.recording && (
<button
onClick={controls.start}
className={styles.record}
>
●
</button>
)}

{controls.recording && !controls.paused && (
<button
onClick={controls.pause}
className={styles.pause}
>
❚❚
</button>
)}

{controls.recording && controls.paused && (
<button
onClick={controls.resume}
className={styles.resume}
>
▶
</button>
)}

{controls.recording && (
<button
onClick={controls.stop}
className={styles.stop}
>
■
</button>
)}

</div>

);

}
