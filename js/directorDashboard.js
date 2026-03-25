

const API = "http://localhost:5000/api/director";

async function loadDirectorDashboard() {

try {

const revenueRes = await fetch(`${API}/total-revenue`);
const revenue = await revenueRes.json();

const salesRes = await fetch(`${API}/total-sales`);
const sales = await salesRes.json();

const creditRes = await fetch(`${API}/credit-outstanding`);
const credit = await creditRes.json();

const profitRes = await fetch(`${API}/profit`);
const profit = await profitRes.json();

document.getElementById("totalRevenue").textContent =
`UGX ${revenue.totalRevenue.toLocaleString()}`;

document.getElementById("netSales").textContent =
`${sales.totalSales} Tons`;

document.getElementById("creditIssued").textContent =
`UGX ${credit.totalCreditOutstanding.toLocaleString()}`;

document.getElementById("grossProfit").textContent =
`UGX ${profit.estimatedProfit.toLocaleString()}`;

}

catch(error){
console.error(error);
}

}

loadDirectorDashboard();

