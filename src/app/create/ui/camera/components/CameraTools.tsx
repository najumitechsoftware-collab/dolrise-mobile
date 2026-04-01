"use client";

import styles from "../styles/CameraTools.module.css";

export default function CameraTools({controls}:any){

if(!controls) return null;

return(

<div className={styles.tools}>

<button onClick={controls.flip}>
🔄
</button>

<button onClick={controls.flash}>
⚡
</button>

</div>

);

}
