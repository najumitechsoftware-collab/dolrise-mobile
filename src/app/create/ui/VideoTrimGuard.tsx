"use client";

import { useEffect } from "react";

export default function VideoTrimGuard({ files }: any) {

useEffect(()=>{

const urls:string[]=[];

files.forEach((file:File)=>{

if(!file.type.startsWith("video")) return;

const url = URL.createObjectURL(file);
urls.push(url);

const video = document.createElement("video");
video.preload="metadata";
video.src=url;

video.onloadedmetadata=()=>{

if(video.duration>900){

alert(
"Video exceeds 15 minutes. It will be trimmed automatically."
);

}

};

});

return ()=>{

urls.forEach((u)=>URL.revokeObjectURL(u));

};

},[files]);

return null;

}
