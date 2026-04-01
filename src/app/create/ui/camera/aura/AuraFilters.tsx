"use client";

import styles from "./AuraFilters.module.css";

const filters = [
"Original",
"Warm",
"Dream",
"Golden",
"Vintage",
"Deep"
];

export default function AuraFilters({onSelect}:any){

return(

<div className={styles.wrapper}>

<h3 className={styles.title}>

Aura Filters

</h3>

<div className={styles.filters}>

{filters.map(f=>(

<button
key={f}
className={styles.filter}
onClick={()=>onSelect && onSelect(f)}
>

{f}

</button>

))}

</div>

</div>

);

}
