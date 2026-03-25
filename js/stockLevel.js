const token = localStorage.getItem("token");

if(!token){
  window.location.href = "../login.html";
}

// DOM
const stockTableBody = document.getElementById("stockTableBody");
const cards = document.querySelectorAll(".cards .card");

// Pagination
let currentPage = 1;
const rowsPerPage = 5;
let allStocks = [];

// Toast
function showToast(message, type = "success"){
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.classList.add("toast", type, "show");
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(()=>{
    toast.remove();
  },3000);
}

// ================= SUMMARY =================
async function loadSummary(){
  try{
    const res = await fetch("http://localhost:3000/dashboard/manager/summary",{
      headers:{ Authorization:"Bearer " + token }
    });

    const data = await res.json();

    cards[0].querySelector("h2").innerHTML = `${data.totalStock || 0} Tons`;
    cards[1].querySelector("h2").innerHTML = `${data.totalBranches || 0} Units`;
    cards[2].querySelector("h2").innerHTML = `${data.lowStockCount || 0} Items`;
    cards[3].querySelector("h2").innerHTML = `${data.outOfStockCount || 0} Critical`;

  }catch(err){
    showToast("Failed to load summary","error");
  }
}

// ================= LOAD STOCK =================
async function loadStockTable(){

  stockTableBody.innerHTML = `
    <tr>
      <td colspan="6" style="text-align:center;padding:20px;">
        Loading stock data...
      </td>
    </tr>
  `;

  try{
    const res = await fetch("http://localhost:3000/dashboard/manager/stock-levels",{
      headers:{ Authorization:"Bearer " + token }
    });

    const stocks = await res.json();

    allStocks = stocks || [];

    renderTable();
    renderPagination();

  }catch(err){
    showToast("Failed to load stock data","error");
  }
}

// ================= RENDER TABLE =================
function renderTable() {

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const pageData = allStocks.slice(start, end);

  stockTableBody.innerHTML = "";

  if (pageData.length === 0) {
    stockTableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;">No stock data</td>
      </tr>
    `;
    return;
  }

  pageData.forEach(stock => {

    const name = stock.produce || "Unknown";
    const category = "Cereal"; // since backend doesn’t send category
    const branch = "Main Warehouse"; // optional (not in your API)

    const percentage = stock.percentage || 0;
    const remaining = stock.remainingStock || 0;
    const capacity = stock.capacity || 0;

    // STATUS
    let statusClass = "healthy";
    let statusText = "In stock";

    if (percentage <= 20 && percentage > 0) {
      statusClass = "low";
      statusText = "Low Stock";
    }

    if (percentage === 0) {
      statusClass = "out";
      statusText = "Out of Stock";
    }

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><strong>${name}</strong></td>
      <td>${category}</td>

      <td>
        <div class="progress">
          <div style="display:flex;justify-content:space-between;font-size:10px;">
            <span>${percentage}%</span>
            <span>${remaining}/${capacity} kg</span>
          </div>

          <div class="progress-bar">
            <div class="progress-fill ${statusClass}" style="width:${percentage}%"></div>
          </div>
        </div>
      </td>

      <td>${branch}</td>

      <td>
        <span class="status ${statusClass}">${statusText}</span>
      </td>

      <!-- ACTIONS -->
      <td class="actions">
        <button class="btn-view" onclick="viewStock('${stock.productId}')">View</button>
        <button class="btn-delete" onclick="deleteStock('${stock.productId}')">Delete</button>
      </td>
    `;

    stockTableBody.appendChild(tr);
  });
}

// ================= PAGINATION =================
function renderPagination() {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  const totalPages = Math.ceil(allStocks.length / rowsPerPage);

  // PREVIOUS
  const prev = document.createElement("button");
  prev.textContent = "Previous";
  prev.disabled = currentPage === 1;

  prev.onclick = () => {
    currentPage--;
    renderTable();
    renderPagination();
  };

  container.appendChild(prev);

  // PAGES
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPage) btn.classList.add("active");

    btn.onclick = () => {
      currentPage = i;
      renderTable();
      renderPagination();
    };

    container.appendChild(btn);
  }

  // NEXT
  const next = document.createElement("button");
  next.textContent = "Next";
  next.disabled = currentPage === totalPages;

  next.onclick = () => {
    currentPage++;
    renderTable();
    renderPagination();
  };

  container.appendChild(next);
}

// ================= ACTIONS =================
window.viewStock = function(id){
  showToast("Viewing stock " + id);
}

window.deleteStock = function(id){
  if(confirm("Delete this item?")){
    showToast("Deleted " + id, "error");
  }
}



// ================= INIT =================
document.addEventListener("DOMContentLoaded",()=>{
  loadSummary();
  loadStockTable();
});


