

const token = localStorage.getItem("token");
let stockData = [];

document.addEventListener("DOMContentLoaded", () => {
  loadDashboardData();
});

async function loadDashboardData() {
  try {
    // --- Daily Cash Sales ---
    const dailyRes = await fetch("http://localhost:3000/dashboard/sales-agent/daily-sales", {
      headers: { Authorization: "Bearer " + token }
    });
    const dailySales = await dailyRes.json();
    const totalDaily = dailySales.reduce((sum, s) => sum + Number(s.amountPaid || 0), 0);
    document.querySelector(".stats .card:nth-child(1) h3").textContent = "$" + totalDaily.toLocaleString();

    // --- Credit Sales ---
    const creditRes = await fetch("http://localhost:3000/dashboard/sales-agent/credit-sales", {
      headers: { Authorization: "Bearer " + token }
    });
    const creditSales = await creditRes.json();
    const totalCredit = creditSales.reduce((sum, s) => sum + Number(s.amountDue || 0), 0);
    document.querySelector(".stats .card:nth-child(2) h3").textContent = "$" + totalCredit.toLocaleString();

    // --- Stock Levels ---
    const stockRes = await fetch("http://localhost:3000/dashboard/sales-agent/stock", {
      headers: { Authorization: "Bearer " + token }
    });
    stockData = await stockRes.json();
    displayStockLevels(stockData);

    // --- Recent Transactions ---
    const recentRes = await fetch("http://localhost:3000/dashboard/sales-agent/sales", {
      headers: { Authorization: "Bearer " + token }
    });
    const recentSales = await recentRes.json();
    displayRecentTransactions(recentSales);

  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
}

function displayStockLevels(stockArray) {
  const container = document.querySelector(".stock");
  container.innerHTML = "<h3 style='margin-bottom:15px'>Stock Levels</h3>";

  stockArray.forEach(item => {
    const maxStock = item.maxStock || 1000;
    const percentage = Math.min(Math.round((item.quantity / maxStock) * 100), 100);
    const color = percentage < 20 ? "red" : percentage < 40 ? "orange" : "green";

    const div = document.createElement("div");
    div.className = "stock-item";
    div.innerHTML = `
      <div class="stock-top">
        <span>${item.product?.name || "Unknown"}</span>
        <span>${item.quantity}kg</span>
      </div>
      <div class="progress">
        <div class="bar ${color}" style="width:${percentage}%"></div>
      </div>
    `;
    container.appendChild(div);
  });
}

function displayRecentTransactions(transactions) {
  const tbody = document.querySelector("#recentTransactions tbody");
  tbody.innerHTML = "";

  transactions.slice(0, 5).forEach(sale => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${new Date(sale.createdAt).toLocaleTimeString()}</td>
      <td>${sale.customerName || "Walk-in"}</td>
      <td>${sale.product?.name || "-"}</td>
      <td class="text-right">${sale.tonnage}</td>
      <td class="text-right">$${sale.amountPaid || sale.amountDue}</td>
      <td class="text-center">
        <span class="badge ${sale.saleType === "CreditSale" ? "badge-orange" : "badge-green"}">
          ${sale.saleType === "CreditSale" ? "Credit" : "Cash"}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}