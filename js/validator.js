export function clearErrors(){

document.querySelectorAll(".error").forEach(e=>{
e.textContent=""
})

}

export function setError(id,message){

document.getElementById(id).textContent = message

}