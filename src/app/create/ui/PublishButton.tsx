"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface PublishButtonProps {
  state: any;
  clearAll: () => void;
}

export default function PublishButton({
  state,
  clearAll,
}: PublishButtonProps) {

  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [progress,setProgress] = useState(0);

  async function publish(){

    if(loading) return;

    if(!state.type){
      alert("Please select a content type.");
      return;
    }

    setLoading(true);
    setProgress(1);

    try{

      let url="";
      let body:BodyInit | null=null;
      let isFormData=false;

      /* ===============================
         VOICE MOMENT
      =============================== */

      if(state.type==="voicemoment"){

        const audio:File | null = state.audioFile;

        if(!audio) throw new Error("Audio missing");

        const form=new FormData();
        form.append("voice",audio);

        const uploadRes=await fetch(
          "https://api.dolrise.com/api/voicemoment/upload",
          {
            method:"POST",
            credentials:"include",
            body:form
          }
        );

        if(!uploadRes.ok){
          throw new Error("Voice upload failed");
        }

        const uploadJson=await uploadRes.json();

        url="https://api.dolrise.com/api/voicemoment/create";

        body=JSON.stringify({
          mood:state.mood || null,
          voiceUrl:uploadJson.voiceUrl,
          visibility:state.visibility,
          reflect:state.reflect,
          reecho:state.reecho
        });

      }

      /* ===============================
         PHOTO / VIDEO
      =============================== */

      else if(state.type==="photo" || state.type==="video"){

        const files:File[] = state.mediaFiles || [];

        if(!files.length){
          throw new Error("Media missing");
        }

        url = state.type==="video"
        ? "https://api.dolrise.com/api/moodcast/video"
        : "https://api.dolrise.com/api/moodcast/photo";

        const form=new FormData();

        form.append("mood",state.mood || "");
        form.append("content",state.description || "");
        form.append("visibility",state.visibility);
        form.append("reflect",state.reflect);
        form.append("reecho",state.reecho);

        if(state.location){
          form.append("location",state.location);
        }

        files.forEach((f:File)=>{
          form.append("media",f);
        });

        body=form;
        isFormData=true;

      }

      /* ===============================
         SHORT TEXT
      =============================== */

      else if(state.type==="textshort"){

        url="https://api.dolrise.com/api/textshort";

        body=JSON.stringify({
          mood:state.mood || null,
          content:state.text,
          visibility:state.visibility,
          reflect:state.reflect,
          reecho:state.reecho,
          background:state.background || null
        });

      }

      /* ===============================
         LONG TEXT
      =============================== */

      else if(state.type==="textlong"){

        url="https://api.dolrise.com/api/textlong";

        body=JSON.stringify({
          mood:state.mood || null,
          content:state.text,
          visibility:state.visibility,
          reflect:state.reflect,
          reecho:state.reecho
        });

      }

      if(!url || !body){
        throw new Error("Invalid publish state");
      }

      /* ===============================
         UPLOAD
      =============================== */

      const xhr=new XMLHttpRequest();

      xhr.withCredentials=true;

      xhr.upload.onprogress=(e)=>{
        if(e.lengthComputable){
          const percent=Math.round(
            (e.loaded/e.total)*100
          );
          setProgress(percent);
        }
      };

      xhr.onload=()=>{

        if(xhr.status>=200 && xhr.status<300){

          clearAll();
          router.push("/risefeed");

        }else{

          console.error(xhr.responseText);
          alert("Publish failed.");

        }

        setLoading(false);

      };

      xhr.onerror=()=>{
        alert("Network error.");
        setLoading(false);
      };

      xhr.open("POST",url);

      if(!isFormData){
        xhr.setRequestHeader(
          "Content-Type",
          "application/json"
        );
      }

      xhr.send(body);

    }catch(err){

      console.error(err);
      alert("Failed to publish.");
      setLoading(false);

    }

  }

  return(

    <div>

      <button
      className="publish-btn"
      disabled={loading}
      onClick={publish}
      >
      {loading ? `Uploading ${progress}%` : "Publish"}
      </button>

      {loading && (

        <div
        style={{
        height:6,
        background:"#eee",
        marginTop:6
        }}
        >

        <div
        style={{
        height:"100%",
        width:`${progress}%`,
        background:"#0070f3",
        transition:"width 0.2s ease"
        }}
        />

        </div>

      )}

    </div>

  );

}
