const API = "http://localhost:3000/dashboard/director";

async function loadReports() {
  try {
    const revenue = await fetch(`${API}/total-revenue`).then(r=>r.json());
    const credit = await fetch(`${API}/credit-outstanding`).then(r=>r.json());
    const profit = await fetch(`${API}/profit`).then(r=>r.json());
    const sales = await fetch(`${API}/total-sales`).then(r=>r.json());
    const cost = await fetch(`${API}/procurement-cost`).then(r=>r.json());
    const branches = await fetch(`${API}/branch-stock`).then(r=>r.json());

    document.getElementById("reportRevenue").textContent = `UGX ${revenue.totalRevenue.toLocaleString()}`;
    document.getElementById("reportCost").textContent = `UGX ${cost.totalProcurementCost.toLocaleString()}`;
    document.getElementById("reportProfit").textContent = `UGX ${profit.estimatedProfit.toLocaleString()}`;
    document.getElementById("reportCredit").textContent = `UGX ${credit.totalCreditOutstanding.toLocaleString()}`;
    document.getElementById("reportSales").textContent = `${sales.totalSales} Tons`;

    const table = document.getElementById("branchStockTable");
    table.innerHTML = "";
    branches.forEach(branch => {
      table.innerHTML += `
      <tr>
        <td>${branch._id}</td>
        <td>${branch.totalRemainingStock} Tons</td>
      </tr>
      `;
    });

  } catch(err) {
    console.error(err);
  }
}

loadReports();