

document.addEventListener("DOMContentLoaded", () => {

  loadSummary()
  loadStockLevels()
  loadTransactions()
  loadLowStock()

})







async function loadSummary(){

try{

const res = await fetch("http://localhost:3000/dashboard/manager/summary",{

headers:{
Authorization:"Bearer " + localStorage.getItem("token")
}

})

const data = await res.json()

document.getElementById("totalStock").textContent =
(data.totalStock || 0) + " kg"

document.getElementById("totalSales").textContent =
(data.totalSales || 0) + " kg"

document.getElementById("totalProcurement").textContent =
(data.totalProcurement || 0) + " kg"

}catch(err){

console.log("Summary Error:",err)

}

}





async function loadLowStock(){
  try{
    const res = await fetch("http://localhost:3000/dashboard/manager/low-stock",{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    if(!res.ok){
      throw new Error("Failed to fetch low stock");
    }

    const data = await res.json();

    //  Ensure it's always an array
    const lowStockItems = Array.isArray(data) ? data : [];
    console.log(lowStockItems)

    //  Update card 
    const countEl = document.getElementById("lowStockCount");

    if(countEl){
      countEl.textContent = lowStockItems.length;
    }

    // Show notification dot
    const dot = document.querySelector(".notification-dot");
    if(dot){
      dot.style.display = lowStockItems.length > 0 ? "block" : "none";
    }

    showNotifications(lowStockItems)

  }catch(err){
    console.log("Low Stock Error:", err);

    
    const countEl = document.getElementById("lowStockCount");
    if(countEl){
      countEl.textContent = "0";
    }
  }
}

function showNotifications(items){
  const dropdown = document.getElementById("notificationDropdown");

  dropdown.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");

    const name = item.product?.name || item.produce || item.name || "Item";
    const stock = item.remainingStock || 0;

    div.textContent = `${name} is low (${stock}kg left)`;

    dropdown.appendChild(div);
  });

  document.querySelector(".notification").onclick = () => {
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  };
}



async function loadStockLevels() {

try {

const token = localStorage.getItem("token")

if(!token){
console.log("No token found")
return
}

const res = await fetch("http://localhost:3000/dashboard/manager/stock-levels",{
headers:{
Authorization: "Bearer " + token
}
})

if(!res.ok){
console.log("Failed to fetch stock levels")
return
}

const stocks = await res.json()

const container = document.getElementById("stockContainer")

if(!container){
console.log("stockContainer not found in HTML")
return
}

container.innerHTML = ""

// If backend returns empty array
if(!stocks || stocks.length === 0){
container.innerHTML = "<p>No stock data available</p>"
return
}

stocks.forEach(stock => {

let percentage = stock.percentage || 0
percentage = Math.min(percentage,100)

let fillClass = ""
let statusText = ""

if(percentage <= 20){
fillClass = "fill-red"
statusText = "Low Stock"
}
else if(percentage <= 50){
fillClass = "fill-yellow"
statusText = "Moderate"
}
else{
fillClass = "fill-green"
statusText = "Healthy"
}

const item = document.createElement("div")
item.className = "stock-item"

item.innerHTML = `

<div class="stock-top">

<div class="stock-left">
${stock.produce || "Unknown Product"}
</div>

<span>
${percentage}% Capacity (${stock.remainingStock || 0} Tonnes)
</span>

</div>

<div class="progress">
<div class="progress-fill ${fillClass}" style="width:${percentage}%"></div>
</div>

`

container.appendChild(item)

})

} catch (err) {

console.log("Stock Levels Error:", err)

}

}


let currentPage = 1;
const rowsPerPage = 5;
let allTransactions = [];


async function loadTransactions(){
  try{
    const res = await fetch("http://localhost:3000/dashboard/manager/recent-transactions",{
      headers:{
        Authorization:"Bearer " + localStorage.getItem("token")
      }
    });

    const data = await res.json();

    
    allTransactions = [
      ...data.recentSales.map(s => ({...s, type:"Sale"})),
      ...data.recentProcurements.map(p => ({...p, type:"Procurement"}))
    ];

    currentPage = 1; // reset page

    displayTable(); // show first page

  }catch(err){
    console.log("Transaction Error:", err);
  }
}


function displayTable(){
  const table = document.getElementById("transactionTable");
  table.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const paginated = allTransactions.slice(start, start + rowsPerPage);

  paginated.forEach(tx => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${tx._id.slice(-6)}</td>
      <td>${tx.product.name} (${tx.tonnage}kg)</td>
      <td style="color:${tx.type === "Sale" ? "#16a34a" : "#2563eb"};">
        ${tx.type}
      </td>
      <td>${new Date(tx.createdAt).toLocaleDateString()}</td>
      <td>UGX ${tx.amountPaid || tx.totalAmount || "-"}</td>
      <td><span class="status completed">Completed</span></td>
    `;

    table.appendChild(row);
  });

  renderPagination();
}


function renderPagination(){
  const totalPages = Math.ceil(allTransactions.length / rowsPerPage);

  const pageNumbers = document.getElementById("pageNumbers");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  pageNumbers.innerHTML = "";

  // PAGE NUMBERS
  for(let i = 1; i <= totalPages; i++){
    const page = document.createElement("div");
    page.className = "page";
    page.textContent = i;

    if(i === currentPage){
      page.classList.add("active");
    }

    page.onclick = () => {
      currentPage = i;
      displayTable();
    };

    pageNumbers.appendChild(page);
  }

  // PREVIOUS BUTTON
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if(currentPage > 1){
      currentPage--;
      displayTable();
    }
  };

  // NEXT BUTTON
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if(currentPage < totalPages){
      currentPage++;
      displayTable();
    }
  };
}




