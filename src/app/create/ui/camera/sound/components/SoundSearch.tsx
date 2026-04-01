"use client";

import { useState } from "react";

import styles from "../styles/SoundSearch.module.css";

export default function SoundSearch({onSearch}:any){

const [value,setValue]=useState("");

function handleChange(e:any){

const v=e.target.value;

setValue(v);

onSearch(v);

}

return(

<input
className={styles.search}
placeholder="Search emotion sounds..."
value={value}
onChange={handleChange}
/>

);

}
