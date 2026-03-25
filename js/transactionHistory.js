const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", loadSalesTransactions);

async function loadSalesTransactions() {
  const tbody = document.querySelector("#allTransactions tbody");
  tbody.innerHTML = "";

  try {
    const res = await fetch("http://localhost:3000/agent/dashboard/sales", {
      headers: { Authorization: "Bearer " + token }
    });
    const sales = await res.json();

    sales.forEach(sale => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${new Date(sale.createdAt).toLocaleString()}</td>
        <td>#${sale._id.slice(-6)}</td>
        <td>${sale.customerName || "Walk-in"}</td>
        <td>${sale.product?.name || "-"}</td>
        <td>
          <div class="type ${sale.saleType === "CreditSale" ? "credit" : "cash"}">
            ${sale.saleType === "CreditSale" ? "Credit" : "Cash"}
          </div>
        </td>
        <td class="amount">${sale.amountPaid || sale.amountDue}</td>
        <td><span class="badge completed">Completed</span></td>
      `;
      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error("Error loading sales transactions:", error);
  }
}