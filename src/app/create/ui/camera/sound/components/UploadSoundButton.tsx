"use client";

import { useRef, useState } from "react";
import styles from "../styles/UploadSoundButton.module.css";

export default function UploadSoundButton({ onUploaded }: any) {

const inputRef = useRef<HTMLInputElement | null>(null);

const [uploading,setUploading] = useState(false);

/* ======================
OPEN FILE PICKER
====================== */

function openPicker(){

if(uploading) return;

inputRef.current?.click();

}

/* ======================
UPLOAD SOUND
====================== */

async function handleFile(e:any){

const file = e.target.files?.[0];

if(!file) return;

/* validate audio */

if(!file.type.startsWith("audio/")){
alert("Only audio files allowed");
return;
}

try{

setUploading(true);

const form = new FormData();

form.append("audio",file);
form.append("title",file.name);
form.append("duration","0");
form.append("category_id","default");

/* ======================
UPLOAD REQUEST
====================== */

const res = await fetch(
"/api/emotion-sounds/upload",
{
method:"POST",
body:form
}
);

if(!res.ok){

throw new Error("Upload failed");

}

const data = await res.json();

console.log("Emotion sound uploaded:",data);

/* ======================
REFRESH LIBRARY
====================== */

if(onUploaded){

onUploaded();

}

/* reset input */

if(inputRef.current){

inputRef.current.value = "";

}

}catch(err){

console.error(err);

alert("Upload failed");

}finally{

setUploading(false);

}

}

/* ======================
UI
====================== */

return(

<div className={styles.uploadBox}>

<input
type="file"
accept="audio/*"
ref={inputRef}
style={{display:"none"}}
onChange={handleFile}
/>

<button
onClick={openPicker}
className={styles.upload}
disabled={uploading}
>

{uploading ? "Uploading..." : "＋ Upload your sound"}

</button>

</div>

);

}
