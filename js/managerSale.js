
import { clearErrors, setError } from "./validator.js";
const toastContainer = document.getElementById('toast-container');

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



const form = document.getElementById("salesForm");
const submitBtn = document.getElementById("submitBtn");

loadProducts()

form.addEventListener("submit", async function(e){

e.preventDefault();

clearErrors()



const saleType = document.getElementById("regularBtn").classList.contains("active")
? "cashSale"
: "CreditSale";

const data = {

product: document.getElementById("product").value,
tonnage: Number(document.getElementById("tonnage").value),
buyerName: document.getElementById("buyerName").value,
date: document.getElementById("date").value,
salesAgentName: document.getElementById("salesAgentName").value,
branch: document.getElementById("branch").value,
produceType: document.getElementById("produceType").value,

saleType

};

if(saleType === "cashSale"){

data.cashamountPaid = Number(document.getElementById("cashamountPaid").value)
data.paymentMethod = document.getElementById("paymentMethod").value

}

if(saleType === "CreditSale"){

data.amountDue = Number(document.getElementById("amountDue").value)
data.nationalId = document.getElementById("nationalId").value
data.location = document.getElementById("location").value
data.contacts = document.getElementById("contacts").value
data.dispatchDate = document.getElementById("dispatchDate").value
data.dueDate = document.getElementById("dueDate").value
data.totalAmount = Number(document.getElementById("totalAmount").value)
data.creditamountPaid = Number(document.getElementById("creditamountPaid").value)
data.paymentStatus = document.getElementById("paymentStatus").value

}

if(!validateForm(data, saleType)){
return;
}

submitBtn.disabled = true;
submitBtn.innerText = "Saving...";
await new Promise(resolve => setTimeout(resolve, 1000));

try{

const res = await fetch("http://localhost:3000/sales",{

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

showToast("Sale recorded successfully","success");

form.reset();

setTimeout(() => {
  window.location.href = "manager-dashboard.html";
}, 1500);

}catch(error){

showToast(error.message,"error");

}finally{
  submitBtn.disabled = false;
  submitBtn.innerText = "Save Sale Record";
}

});

async function loadProducts(){

try{

const res = await fetch("http://localhost:3000/products",{
headers:{
"Authorization":"Bearer " + localStorage.getItem("token")
}
});

const products = await res.json();



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


function validateForm(data, saleType){

let isValid = true;

// convert numbers
data.tonnage = Number(data.tonnage);
data.cashamountPaid = Number(data.cashamountPaid || 0);
data.creditamountPaid = Number(data.creditamountPaid || 0);
data.totalAmount = Number(data.totalAmount || 0);

// ---------- Common ----------
if(!data.product || data.product === ""){
  setError("productError","Please select a product");
  isValid = false;
}

if(!data.tonnage || data.tonnage < 1000){
  setError("tonnageError","Tonnage must be at least 1000 kg");
  isValid = false;
}

if(!data.buyerName || data.buyerName.trim().length < 3){
  setError("buyerNameError","Enter valid buyer name");
  isValid = false;
}

if(!data.date){
  setError("dateError","Enter date");
  isValid = false;
}

if(!data.salesAgentName || data.salesAgentName.trim().length < 3){
  setError("salesAgentNameError","Enter valid sales agent name");
  isValid = false;
}

if(!data.branch){
  setError("branchError","Select Branch");
  isValid = false;
}
if(!data.produceType || data.produceType === ""){
setError("produceTypeError","Enter produce Type")
isValid = false
}

// ---------- Cash ----------
if(saleType === "cashSale"){

if(!data.cashamountPaid || data.cashamountPaid < 10000){
  setError("cashamountPaidError","Enter amount paid");
  isValid = false;
}

if(!data.paymentMethod || data.paymentMethod === ""){
  setError("paymentMethodError","Select payment method");
  isValid = false;
}

}

// ---------- Credit ----------
if(saleType === "CreditSale"){

const ninRegex = /^(CM|CF)\d{12}$/;

if(!data.nationalId){
  setError("nationalIDError","Enter national id");
  isValid = false;
}

if(!ninRegex.test(data.nationalId)){
  setError("nationalIDError","Enter valid national id");
  isValid = false;
}

if(!data.location || !data.location.trim()){
  setError("locationError","Enter location");
  isValid = false;
}

const contact = (data.contacts || "").trim();

if(!/^(\+256|256|0)7\d{8}$/.test(contact)){
  setError("contactError","Enter valid contact");
  isValid = false;
}

if(!data.amountDue || Number(data.amountDue) < 0){
  setError("amountDueError","Enter valid amount due");
  isValid = false;
}

if(!data.dispatchDate){
  setError("dispatchDateError","Enter dispatch date");
  isValid = false;
}

if(!data.totalAmount || data.totalAmount < 0){
  setError("totalAmountError","Enter total amount");
  isValid = false;
}

if(!data.paymentStatus || data.paymentStatus === ""){
  setError("paymentStatusError","Select payment status");
  isValid = false;
}

if(!data.dueDate){
  setError("dueDateError","Enter due date");
  isValid = false;
}

if(!data.creditamountPaid || data.creditamountPaid < 0){
  setError("creditamountPaidError","Enter amount paid");
  isValid = false;
}

}

return isValid;
}


document.querySelector(".btn-cancel").onclick = () => {
  window.location.href = "manager-dashboard.html";
};



function getUserFromToken(){
  const token = localStorage.getItem("token");

  if(!token) return null;

  try{
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  }catch(err){
    console.log("Token decode error:", err);
    return null;
  }
}


const user = getUserFromToken();

if(user){
  document.getElementById("salesAgentName").value = user.username;
}