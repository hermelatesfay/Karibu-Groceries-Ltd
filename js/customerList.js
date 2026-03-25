document.addEventListener("DOMContentLoaded", loadCustomers);

async function loadCustomers(){

  const res = await fetch(
    "http://localhost:3000/agent/credit-sales",
    {
      headers:{
        Authorization:"Bearer "+localStorage.getItem("token")
      }
    }
  );

  const creditSales = await res.json();

  const tbody = document.querySelector("tbody");

  tbody.innerHTML = "";

  creditSales.forEach(sale=>{

    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${sale.customerName}</td>
    <td><span class="badge wholesaler">Customer</span></td>
    <td>${sale.location || "-"}</td>
    <td>-</td>
    <td style="color:orange;font-weight:600;">
    ${sale.amountDue}
    </td>
    <td>
    <button class="action-btn">
    <span class="material-symbols-outlined">more_horiz</span>
    </button>
    </td>
    `;

    tbody.appendChild(tr);

  });

}