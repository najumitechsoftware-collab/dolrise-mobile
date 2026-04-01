"use client";

import styles from "../styles/SoundCategories.module.css";

export default function SoundCategories({categories,selected,onSelect}:any){

return(

<div className={styles.row}>

{categories.map((c:any)=>{

const active = selected===c.id;

return(

<button
key={c.id}
className={active?styles.active:styles.btn}
onClick={()=>onSelect(active?null:c.id)}
>

{c.name}

</button>

);

})}

</div>

);

}
