"use client";

import { useEffect, useState } from "react";

import SoundSearch from "./components/SoundSearch";
import SoundCategories from "./components/SoundCategories";
import ResonatingSounds from "./components/ResonatingSounds";
import SoundList from "./components/SoundList";
import UploadSoundButton from "./components/UploadSoundButton";

import {
fetchCategories,
fetchResonating,
searchSounds
} from "./services/emotionSound.api";

import styles from "./styles/EmotionSoundModal.module.css";

export default function EmotionSoundModal({ onClose, onSelect }: any){

const [categories,setCategories] = useState<any[]>([]);
const [sounds,setSounds] = useState<any[]>([]);
const [query,setQuery] = useState("");
const [loading,setLoading] = useState(false);
const [selectedCategory,setSelectedCategory] = useState<string | null>(null);

useEffect(()=>{
loadInitial();
},[]);

async function loadInitial(){

try{

setLoading(true);

const [cats,resSounds] = await Promise.all([
fetchCategories(),
fetchResonating()
]);

setCategories(cats);
setSounds(resSounds);

}catch(err){

console.error("Emotion sound load error:",err);

}finally{

setLoading(false);

}

}

async function handleSearch(q:string){

setQuery(q);

if(!q){

loadInitial();
return;

}

try{

setLoading(true);

const data = await searchSounds(q);

setSounds(data);

}catch(err){

console.error(err);

}finally{

setLoading(false);

}

}

function handleCategory(catId:string | null){

setSelectedCategory(catId);

if(!catId){
loadInitial();
return;
}

const filtered = sounds.filter(
(s:any)=>s.category_id===catId
);

setSounds(filtered);

}

return(

<div className={styles.overlay}>

<div className={styles.modal}>

{/* HEADER */}

<div className={styles.header}>

<h2 className={styles.title}>Emotion Sound</h2>

<button
onClick={onClose}
className={styles.close}
>
✕
</button>

</div>


{/* UPLOAD */}

<UploadSoundButton onUploaded={loadInitial}/>


{/* SEARCH */}

<SoundSearch onSearch={handleSearch}/>


{/* CATEGORIES */}

<SoundCategories
categories={categories}
selected={selectedCategory}
onSelect={handleCategory}
/>


{/* LOADING */}

{loading && (

<div className={styles.loading}>
Loading emotion sounds...
</div>

)}


{/* RESONATING */}

{!query && !selectedCategory && (

<ResonatingSounds
sounds={sounds}
onSelect={onSelect}
/>

)}


{/* SOUND LIST */}

<SoundList
sounds={sounds}
onSelect={onSelect}
/>


</div>

</div>

);

}
