"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

import CameraPreview from "./components/CameraPreview";
import CameraTopBar from "./components/CameraTopBar";
import CameraTools from "./components/CameraTools";
import RecordControls from "./components/RecordControls";
import ModeSelector from "./components/ModeSelector";

import EmotionSoundModal from "./sound/EmotionSoundModal";

import GalleryPicker from "./gallery/GalleryPicker";
import GalleryPreview from "./gallery/GalleryPreview";

import styles from "./styles/EmotionCamera.module.css";

export default function EmotionCamera(){

const router = useRouter();

const wrapperRef = useRef<HTMLDivElement | null>(null);

const [controls,setControls] = useState<any>(null);

const [recording,setRecording] = useState(false);

const [openSound,setOpenSound] = useState(false);

const [showConfirm,setShowConfirm] = useState(false);

const [zoom,setZoom] = useState(1);

const [mode,setMode] = useState("Emotion");

const [galleryFile,setGalleryFile] = useState<File | null>(null);

const touchStartX = useRef<number>(0);

/* STOP CAMERA */

const stopCameraStream = useCallback(()=>{

if(!controls) return;

if(controls.stop){

controls.stop();

}

},[controls]);

/* CLOSE CAMERA */

const handleCloseCamera = useCallback(()=>{

if(recording){

setShowConfirm(true);

return;

}

stopCameraStream();

router.push("/create");

},[recording,stopCameraStream,router]);

/* SOUND */

function handleOpenSound(){

setOpenSound(true);

}

function handleSelectSound(sound:any){

if(controls?.setSound){

controls.setSound(sound.file_url);

}

setOpenSound(false);

}

/* GALLERY SELECT */

function handleGalleryFile(file:File){

setGalleryFile(file);

}

/* BACK FROM PREVIEW */

function handleBackPreview(){

setGalleryFile(null);

}

/* ZOOM */

function handleWheel(e:any){

if(openSound) return;

if(!controls?.setZoom) return;

let next = zoom + (e.deltaY * -0.001);

next = Math.min(Math.max(1,next),3);

setZoom(next);

controls.setZoom(next);

}

/* SWIPE */

function handleTouchStart(e:any){

touchStartX.current = e.touches[0].clientX;

}

function handleTouchEnd(e:any){

const diff = e.changedTouches[0].clientX - touchStartX.current;

if(Math.abs(diff) < 50) return;

if(diff > 0){

setMode("Aura");

}else{

setMode("Emotion");

}

}

/* UI */

return(

<div
ref={wrapperRef}
className={styles.wrapper}
onWheel={handleWheel}
onTouchStart={handleTouchStart}
onTouchEnd={handleTouchEnd}
>

{/* CAMERA */}

<div className={styles.cameraLayer}>

<CameraPreview
setControls={setControls}
setRecording={setRecording}
/>

</div>

{/* UI */}

<div className={styles.uiLayer}>

<CameraTopBar
onClose={handleCloseCamera}
onOpenSound={handleOpenSound}
recording={recording}
/>

<CameraTools controls={controls}/>

<RecordControls
controls={controls}
recording={recording}
setRecording={setRecording}
/>

<ModeSelector
mode={mode}
setMode={setMode}
/>

</div>

{/* GALLERY */}

{mode === "Gallery" && !galleryFile && (

<GalleryPicker
onSelect={handleGalleryFile}
/>

)}

{/* PREVIEW */}

{galleryFile && (

<GalleryPreview
file={galleryFile}
onBack={handleBackPreview}
/>

)}

{/* SOUND */}

{openSound && (

<EmotionSoundModal
onClose={()=>setOpenSound(false)}
onSelect={handleSelectSound}
/>

)}

</div>

);

}
