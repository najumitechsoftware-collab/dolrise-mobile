"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateStore } from "@/store/createStore";
import styles from "./styles/GalleryPreview.module.css";

export default function GalleryPreview({ file, onBack }: any) {

const router = useRouter();
const store = useCreateStore();

const [previewUrl,setPreviewUrl] = useState<string | null>(null);

const isVideo = file?.type?.startsWith("video");

/* =========================
PREVIEW
========================= */

useEffect(()=>{

if(!file) return;

const url = URL.createObjectURL(file);

setPreviewUrl(url);

return ()=>{
URL.revokeObjectURL(url);
};

},[file]);

/* =========================
CONTINUE
========================= */

function handleContinue(){

if(!file) return;

const isVideoFile = file.type.startsWith("video");

/* set type */

store.setType(isVideoFile ? "video" : "photo");

/* remove previous media safely */

if(store.mediaFiles && store.mediaFiles.length){

store.mediaFiles.forEach((_:any,index:number)=>{
store.removeMedia(index);
});

}

/* add new file */

store.addMedia([file]);

/* go to create page */

router.push("/create");

}

/* =========================
UI
========================= */

return(

<div className={styles.wrapper}>

<div className={styles.preview}>

{isVideo ? (

<video
src={previewUrl || ""}
controls
playsInline
className={styles.video}
/>

):( 

<img
src={previewUrl || ""}
className={styles.image}
/>

)}

</div>

<div className={styles.actions}>

<button
className={styles.back}
onClick={onBack}
>
Back
</button>

<button
className={styles.next}
onClick={handleContinue}
>
Continue
</button>

</div>

</div>

);

}
