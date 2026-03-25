// import { showToast } from "./utils.js";
import { clearErrors, setError } from "./validator.js";



// ----------------- Toast Function -----------------
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.classList.add('toast', type, 'show');
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('show');
    toast.remove();
  }, 3000);
}

document.querySelector(".cancel-btn").onclick = () => {
  window.location.href = "manager-dashboard.html";
};



document.addEventListener("DOMContentLoaded", init);

let toastContainer;

function init(){
  const submitBtn = document.getElementById("submitBtn");
  toastContainer = document.getElementById('toast-container');
const form = document.getElementById("procurementForm");
const product = document.getElementById("product");
const produceType = document.getElementById("produceType");
const tonnage = document.getElementById("tonnage");
const branch = document.getElementById("branch");
const cost = document.getElementById("cost");
const contact = document.getElementById("contact");
const dateAndTime = document.getElementById("dateAndTime");
const dealerName = document.getElementById("dealerName");

loadProducts();





form.addEventListener("submit", async function(e){

e.preventDefault();

clearErrors()

let isValid = true





if(!product.value){
setError("productError","Please select a product")
isValid = false
}

if(!tonnage.value || tonnage.value < 1000){
setError("tonnageError","Enter valid tonnage")
isValid = false
}

if(!branch.value){
setError("branchError","Select a branch")
isValid = false
}

if(!cost.value || cost.value <= 0){
setError("costError","Enter valid price")
isValid = false
}

if(!produceType.value ){
setError("produceTypeError","Enter produce Type")
isValid = false
}

if(!dealerName.value ){
setError("dealerNameError","Enter dealer Name")
isValid = false
}

if(!/^(\+256|0)[0-9]{9}$/.test(contact.value)){
  setError("contactError","Enter valid phone number");
  isValid = false;
}

if(!dateAndTime.value ){
setError("dateAndTimeError","Enter date and time")
isValid = false
}



if(!isValid) return

//show loading
submitBtn.disabled = true;
submitBtn.textContent = "Saving...";


const data = {
product: product.value,
tonnage: Number(tonnage.value),
branch: branch.value,
cost: Number(cost.value),
contact: contact.value,
dealerName: dealerName.value,
produceType: produceType.value,
dateAndTime: dateAndTime.value,
};

  await new Promise(resolve => setTimeout(resolve, 1000));

try{

const res = await fetch("http://localhost:3000/procurement",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + localStorage.getItem("token")
},
body:JSON.stringify(data)
});

const result = await res.json();

if(!res.ok){
throw new Error(result.message);
}

showToast("Procurement recorded","success");

form.reset();

setTimeout(() => {
  window.location.href = "manager-dashboard.html";
}, 1500);



}catch(err){

showToast(err.message,"error");

}finally{
  //reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <span class="material-symbols-outlined">check_circle</span>
      Submit Procurement
    `;
}


});

}

async function loadProducts(){

try{

const res = await fetch("http://localhost:3000/products",{
headers:{
"Authorization":"Bearer " + localStorage.getItem("token")
}
});

const products = await res.json();
if(products.length === 0){
  showToast("No products available","error");
}

const select = document.getElementById("product");

products.forEach(p=>{
const option = document.createElement("option");
option.value = p._id;
option.textContent = p.name;
select.appendChild(option);
});

}catch(err){

showToast("Failed to load products","error");
console.log(err)
}

}