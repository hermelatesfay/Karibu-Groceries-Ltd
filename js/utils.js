// js/utils.js

export async function api(url, method="GET", body=null){

    const token = localStorage.getItem("token");

    const options = {
        method,
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    };

    if(body){
        options.body = JSON.stringify(body);
    }

    const res = await fetch(`http://localhost:3000${url}`, options);

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "Request failed");
    }

    return data;
}


export function showToast(message,type="success"){

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(()=>{
        toast.remove();
    },3000);
}