document.querySelector(".btn-primary").addEventListener("click", saveSettings);

async function saveSettings(){

const inputs = document.querySelectorAll(".form-group input");

const settings = {
branchName: inputs[0].value,
location: inputs[1].value,
phone: inputs[2].value,
email: inputs[3].value
};

try{

await api.put("/settings", settings);

showToast("Settings updated successfully","success");

}catch(error){

showToast("Failed to update settings","error");

}

}