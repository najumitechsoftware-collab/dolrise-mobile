"use client";

import CameraRecorder from "../../media/camera/CameraRecorder";

export default function CameraPreview({setControls}:any){

function handleCapture(file:File){
console.log("Captured video:",file);
}

return(

<CameraRecorder
onCapture={handleCapture}
onReady={setControls}
/>

);

}
