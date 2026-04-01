"use client";

import styles from "../styles/SoundList.module.css";

export default function ResonatingSounds({sounds,onSelect}:any){

return(

<div className={styles.list}>

<h4>Resonating</h4>

{sounds.map((s:any)=>(
<div
key={s.id}
className={styles.item}
onClick={()=>onSelect(s)}
>

<div>

<b>{s.title}</b>

<p>{s.category?.name}</p>

</div>

<button>
Use
</button>

</div>
))}

</div>

);

}
