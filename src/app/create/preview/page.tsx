"use client";

import { useRouter } from "next/navigation";
import { useCreateStore } from "@/store/createStore";
import PublishButton from "../ui/PublishButton";
import styles from "./Preview.module.css";
import { useState } from "react";

export default function PreviewPage(){

const router = useRouter();
const store = useCreateStore();

const [expanded,setExpanded] = useState(false);

/* =========================
   NO TYPE → BACK
========================= */

if(!store.type){
router.replace("/create");
return null;
}

/* =========================
   STORY PREVIEW
========================= */

if(store.type === "textlong"){

if(!store.text?.trim()){
router.replace("/create");
return null;
}

const [rawTitle,...rest] = store.text.split("\n");

const title = rawTitle.trim();

const body = rest.join("\n").trim();

const shortBody =
body.split(/\n|\./).slice(0,3).join(". ") + "...";

return(

<div className={styles.wrapper}>

{/* HEADER */}

<div className={styles.header}>

<button
className={styles.back}
onClick={()=>router.back()}
>

←

</button>

<span className={styles.headerTitle}>

Story preview

</span>

</div>

{/* STORY */}

<div className={styles.storyCard}>

<h2 className={styles.title}>

{title || "Untitled story"}

</h2>

<p className={styles.body}>

{expanded ? body : shortBody}

</p>

{!expanded && body.length > shortBody.length && (

<button
className={styles.readMore}
onClick={()=>setExpanded(true)}
>

Read more

</button>

)}

</div>

{/* SETTINGS */}

<div className={styles.settings}>

<label className={styles.label}>

Visibility

</label>

<select
value={store.visibility}
onChange={(e)=>
store.setVisibility(
e.target.value as "Public" | "Private"
)
}
className={styles.select}
>

<option value="Public">Public</option>
<option value="Private">Private</option>

</select>

</div>

{/* PUBLISH */}

<div className={styles.publishWrap}>

<PublishButton
state={store}
clearAll={store.clearAll}
/>

</div>

</div>

);

}

/* =========================
   MEDIA PREVIEW
========================= */

const file = store.mediaFiles?.[0];

if(!file){
router.replace("/create");
return null;
}

const isVideo = file.type.startsWith("video");

const url = URL.createObjectURL(file);

return(

<div className={styles.wrapper}>

{/* HEADER */}

<div className={styles.header}>

<button
className={styles.back}
onClick={()=>router.back()}
>

←

</button>

<span className={styles.headerTitle}>

Media preview

</span>

</div>

{/* MEDIA */}

<div className={styles.mediaPreview}>

{isVideo ? (

<video
src={url}
controls
className={styles.video}
/>

):(

<img
src={url}
className={styles.image}
/>

)}

</div>

{/* SETTINGS */}

<div className={styles.settings}>

<label className={styles.label}>

Visibility

</label>

<select
value={store.visibility}
onChange={(e)=>
store.setVisibility(
e.target.value as "Public" | "Private"
)
}
className={styles.select}
>

<option value="Public">Public</option>
<option value="Private">Private</option>

</select>

</div>

{/* PUBLISH */}

<div className={styles.publishWrap}>

<PublishButton
state={store}
clearAll={store.clearAll}
/>

</div>

</div>

);

}
