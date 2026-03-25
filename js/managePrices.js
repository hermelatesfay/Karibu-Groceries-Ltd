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
document.addEventListener("DOMContentLoaded", loadPrices);

const token = localStorage.getItem("token");

async function loadPrices() {

try {

const response = await fetch("http://localhost:3000/products", {
headers:{
Authorization: "Bearer " + token
}
});

if(!response.ok){
throw new Error("Failed to fetch products");
}

const products = await response.json();

renderProducts(products);

}catch(error){

console.error(error);
showToast("Failed to load product prices","error");

}

}


function renderProducts(products){

const tbody = document.querySelector("tbody");
tbody.innerHTML = "";

if(products.length === 0){

tbody.innerHTML = `
<tr>
<td colspan="6" style="text-align:center;padding:20px;">
No products found
</td>
</tr>
`;

return;
}

products.forEach(product => {

const cost = Number(product.costPrice) || 0;
const price = Number(product.price) || 0;

let margin = 0;

if(cost > 0){
margin = (((price - cost) / cost) * 100).toFixed(1);
}

const marginClass = margin > 18 ? "margin-green" : "margin-yellow";

const date = product.updatedAt
? new Date(product.updatedAt).toLocaleDateString()
: "N/A";


const row = document.createElement("tr");

row.innerHTML = `

<td>
<b>${product.name}</b><br>
<small>SKU: ${product.sku}</small>
</td>

<td class="price">UGX ${cost.toLocaleString()}</td>

<td class="price">UGX ${price.toLocaleString()}</td>

<td>
<span class="margin ${marginClass}">
${margin}%
</span>
</td>

<td>${date}</td>

<td style="text-align:right;">
<button class="edit-btn" data-id="${product._id}">
Edit
</button>
</td>

`;

tbody.appendChild(row);

});

attachEditEvents();

}


function attachEditEvents(){

document.querySelectorAll(".edit-btn").forEach(button => {

button.addEventListener("click", async function(){

const id = this.dataset.id;

const newPrice = prompt("Enter new price");

if(!newPrice) return;

try{

const response = await fetch(`http://localhost:3000/products/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:"Bearer " + token
},

body:JSON.stringify({
price:Number(newPrice)
})

});

if(!response.ok){
throw new Error("Update failed");
}

showToast("Price updated successfully","success");

loadPrices();

}catch(error){

console.error(error);
showToast("Failed to update price","error");

}

});

});

}