export async function getResonatingSounds(){

const res=await fetch("/api/emotion-sounds/resonating");

return res.json();

}

export async function searchSounds(search:string,category:string|null){

let url="/api/emotion-sounds/search";

const params=new URLSearchParams();

if(search) params.append("q",search);
if(category) params.append("category",category);

if(params.toString()){

url+="?"+params.toString();

}

const res=await fetch(url);

return res.json();

}
