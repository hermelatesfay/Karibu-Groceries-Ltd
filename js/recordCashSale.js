const toastContainer = document.getElementById('toast-container');

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

// Get token
const token = localStorage.getItem("token");

// Decode JWT to get user info
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;

  }
}

const userData = parseJwt(token);
document.getElementById("salesAgentName").textContent = userData?.name || "Unknown";

// Load products
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:3000/agent/dashboard/stock", {
      headers: { Authorization: "Bearer " + token }
    });
    const stockData = await res.json();
    const select = document.getElementById("productSelect");
    select.innerHTML = "<option>Select produce</option>";
    stockData.forEach(item => {
      const option = document.createElement("option");
      option.value = item.product?._id || "";
      option.textContent = item.product?.name || "Unknown";
      select.appendChild(option);
    });

    // Set current datetime
    const now = new Date().toISOString().slice(0,16);
    document.getElementById("dateTimeInput").value = now;

  } catch (err) {
    console.error(err);
  }
});

loadProducts()

// Submit form
document.getElementById("cashSaleForm").addEventListener("submit", async e => {
  e.preventDefault();

  const payload = {
    product: document.getElementById("productSelect").value,
    produceType: document.getElementById("produceTypeInput").value,
    tonnage: Number(document.getElementById("tonnageInput").value),
    amountPaid: Number(document.getElementById("amountPaidInput").value),
    customerName: document.getElementById("buyerInput").value,
    salesAgent: userData?.name || "",
    branch: document.getElementById("branchInput").value,
    dateTime: document.getElementById("dateTimeInput").value,
    paymentMethod: document.getElementById("paymentMethodSelect").value
  };

  try {
    const res = await fetch("http://localhost:3000/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Sale failed");
    showToast("Sale recorded successfully", "success");

    document.getElementById("cashSaleForm").reset();

  } catch (err) {
    console.error(err);
    showToast("Error recording sale", "error");
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
console.log(products)

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