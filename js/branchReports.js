// Toast container
const toastContainer = document.getElementById("toast-container");

// Toast message
function showToast(message, type = "success") {

const toast = document.createElement("div");
toast.classList.add("toast", type, "show");
toast.textContent = message;

toastContainer.appendChild(toast);

setTimeout(() => {
toast.classList.remove("show");
toast.remove();
},3000);

}



// DOM Elements


const totalSalesCard = document.querySelector(".cards .card:nth-child(1) h2");
const totalCreditCard = document.querySelector(".cards .card:nth-child(2) h2");
const totalRevenueCard = document.querySelector(".cards .card:nth-child(3) h2");
const outstandingCard = document.querySelector(".cards .card:nth-child(4) h2");

const tableBody = document.querySelector(".table-wrapper tbody");

const token = localStorage.getItem("token");



// Format Currency


function formatCurrency(amount){

return new Intl.NumberFormat("en-UG",{
style:"currency",
currency:"UGX"
}).format(amount);

}



// Load Dashboard Cards


async function loadBranchCards(){

try{

const res = await fetch("http://localhost:3000/dashboard/manager/summary",{

headers:{
Authorization:"Bearer " + token
}

});

if(!res.ok){
throw new Error("Failed to fetch summary");
}

const summary = await res.json();

totalSalesCard.textContent = formatCurrency(summary.totalSales || 0);
totalCreditCard.textContent = formatCurrency(summary.totalCreditSales || 0);
totalRevenueCard.textContent = formatCurrency(summary.totalRevenue || 0);
outstandingCard.textContent = formatCurrency(summary.totalCreditOutstanding || 0);

}catch(err){

console.error(err);
showToast("Failed to load dashboard cards","error");

}

}



// Load Branch Table


async function loadBranchTable(){

try{

const res = await fetch("http://localhost:3000/dashboard/manager/branch-report",{

headers:{
Authorization:"Bearer " + token
}

});

if(!res.ok){
throw new Error("Failed to fetch branch report");
}

const data = await res.json();

tableBody.innerHTML = "";

if(!data || data.length === 0){

tableBody.innerHTML = `
<tr>
<td colspan="6" style="text-align:center;padding:20px;">
No report data available
</td>
</tr>
`;

return;
}


data.forEach(report => {

const tr = document.createElement("tr");

const date = report.date
? new Date(report.date).toLocaleDateString()
: "N/A";

const statusClass =
report.status === "Paid" ? "paid" :
report.status === "Pending" ? "pending" :
"overdue";

tr.innerHTML = `

<td>${date}</td>

<td>${report.invoiceNumber || "-"}</td>

<td>${report.customerName || "Walk-in Customer"}</td>

<td>${report.saleType || "Cash"}</td>

<td>${formatCurrency(report.amount || 0)}</td>

<td class="status ${statusClass}">
${report.status || "Paid"}
</td>

`;

tableBody.appendChild(tr);

});

}catch(err){

console.error(err);
showToast("Failed to load branch report","error");

}

}

const API = "http://localhost:3000/dashboard/manager";

document.getElementById("generateReportBtn").addEventListener("click", async () => {
  try {
    // Fetch branch data from backend
    const response = await fetch(`${API}/branch-stock`);
    const branches = await response.json();

    // Create CSV content
    let csvContent = "Branch,Remaining Stock\n";
    branches.forEach(branch => {
      csvContent += `${branch._id},${branch.totalRemainingStock}\n`;
    });

    // Download CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "branch_report.csv");
    link.click();

  } catch (err) {
    console.error("Error generating report:", err);
    showToast("Failed to generate report. Try again.","error");
  }
});



// Initialize Page


document.addEventListener("DOMContentLoaded", ()=>{

loadBranchCards();
loadBranchTable();

});