export async function fetchCategories(){

const res = await fetch("/api/emotion-sounds/categories");

if(!res.ok){
throw new Error("Failed to load categories");
}

return res.json();

}

export async function fetchResonating(){

const res = await fetch("/api/emotion-sounds/resonating");

if(!res.ok){
throw new Error("Failed to load sounds");
}

return res.json();

}

export async function searchSounds(query:string){

const res = await fetch(`/api/emotion-sounds/search?q=${query}`);

if(!res.ok){
throw new Error("Search failed");
}

return res.json();

}
