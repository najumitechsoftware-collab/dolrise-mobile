"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./CameraRecorder.module.css";

interface Props {
  onCapture: (file: File) => void;
  onReady?: (controls: CameraControls) => void;
}

export interface CameraControls {

  start: () => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  flip: () => void;
  flash: () => void;

  setSound: (url: string) => void;

  recording: boolean;
  paused: boolean;
  timer: number;

}

const MAX_DURATION = 60;

export default function CameraRecorder({ onCapture, onReady }: Props){

const videoRef = useRef<HTMLVideoElement | null>(null);

const mediaRecorder = useRef<MediaRecorder | null>(null);

const streamRef = useRef<MediaStream | null>(null);

const chunks = useRef<Blob[]>([]);

/* emotion sound */

const soundRef = useRef<HTMLAudioElement | null>(null);

const selectedSound = useRef<string | null>(null);

const [recording,setRecording] = useState(false);

const [paused,setPaused] = useState(false);

const [timer,setTimer] = useState(0);

const [facing,setFacing] =
useState<"user" | "environment">("environment");

const [flash,setFlash] = useState(false);


/* =========================
START CAMERA
========================= */

async function startCamera(){

if(streamRef.current){

streamRef.current
.getTracks()
.forEach(t=>t.stop());

}

const stream =
await navigator.mediaDevices.getUserMedia({

video:{
facingMode:facing,
width:{ideal:1280},
height:{ideal:720},
frameRate:{ideal:30}
},

audio:true

});

streamRef.current = stream;

if(videoRef.current){

videoRef.current.srcObject = stream;

}

}


/* =========================
SET EMOTION SOUND
========================= */

function setSound(url:string){

selectedSound.current = url;

if(!soundRef.current){

soundRef.current = new Audio();

}

soundRef.current.src = url;

}


/* =========================
START RECORDING
========================= */

function startRecording(){

const stream = streamRef.current;

if(!stream) return;

const recorder =
new MediaRecorder(stream,{
mimeType:"video/webm;codecs=vp8"
});

mediaRecorder.current = recorder;

chunks.current = [];

recorder.ondataavailable = e=>{

if(e.data.size>0){

chunks.current.push(e.data);

}

};

recorder.onstop = ()=>{

const blob =
new Blob(chunks.current,{
type:"video/webm"
});

const file = new File(
[blob],
`dolrise-${Date.now()}.webm`,
{type:"video/webm"}
);

onCapture(file);

chunks.current = [];

setTimer(0);

};

recorder.start(1000);

/* play emotion sound if selected */

if(selectedSound.current && soundRef.current){

soundRef.current.currentTime = 0;

soundRef.current.play()
.catch(()=>{});

}

setRecording(true);

setPaused(false);

}


/* =========================
STOP
========================= */

function stopRecording(){

mediaRecorder.current?.stop();

if(soundRef.current){

soundRef.current.pause();

}

setRecording(false);

setPaused(false);

}


/* =========================
PAUSE
========================= */

function pauseRecording(){

mediaRecorder.current?.pause();

if(soundRef.current){

soundRef.current.pause();

}

setPaused(true);

}


/* =========================
RESUME
========================= */

function resumeRecording(){

mediaRecorder.current?.resume();

if(soundRef.current){

soundRef.current.play().catch(()=>{});

}

setPaused(false);

}


/* =========================
FLIP CAMERA
========================= */

function flipCamera(){

setFacing(p=>
p==="user"?"environment":"user"
);

}


/* =========================
FLASH
========================= */

async function toggleFlash(){

const track =
streamRef.current
?.getVideoTracks()[0];

if(!track) return;

try{

await track.applyConstraints({
advanced:[{torch:!flash} as any]
} as any);

setFlash(!flash);

}catch{

console.warn("Flash unsupported");

}

}


/* =========================
TIMER
========================= */

useEffect(()=>{

if(!recording || paused) return;

const id = setInterval(()=>{

setTimer(t=>{

if(t>=MAX_DURATION){

stopRecording();

return t;

}

return t+1;

});

},1000);

return()=>clearInterval(id);

},[recording,paused]);


/* =========================
CAMERA START
========================= */

useEffect(()=>{

startCamera();

},[facing]);


/* =========================
READY CONTROLS
========================= */

useEffect(()=>{

if(!onReady) return;

onReady({

start:startRecording,
stop:stopRecording,
pause:pauseRecording,
resume:resumeRecording,
flip:flipCamera,
flash:toggleFlash,

setSound:setSound,

recording,
paused,
timer

});

},[recording,paused,timer]);


/* =========================
UI
========================= */

return(

<div className={styles.wrapper}>

<video
ref={videoRef}
autoPlay
muted
playsInline
className={styles.video}
/>

</div>

);

}
